/**
 * Created by Gimm on 7/17/14.
 */

var util = require('util'),
    path = require('path'),
    spawn = require('child_process').spawn,
    merge = require('deepmerge'),
    tinylr = require('tiny-lr'),
    es = require('event-stream'),
    chalk = require('chalk'),
    debug = require('debug')('gulp-express');

module.exports = (function () {
    var server = undefined, // the server child process
        lr = undefined, // tiny-lr server
        config = {
            args: ['app.js'],   // args for child_process.spawn
            options: {  // options for child_process.options
                cwd: undefined
            },
            livereload: {   //option for tiny-lr server
                port: 35729
            }
        },
        info = chalk.gray,
        error = chalk.bold.red;
    config.options.env = process.env;
    config.options.env.server_ENV = 'development';

    var callback = {
        processExit: function (code, sig) {
            debug(info('Main process exited with [code => %s | sig => %s]'), code, sig);
            server && server.kill();
        },

        serverExit: function (code, sig) {
            debug(info('server process exited with [code => %s | sig => %s]'), code, sig);
            if(sig !== 'SIGKILL'){
                //server stopped unexpectedly
                process.exit(0);
            }
        },

        lrServerReady: function () {
            console.log(info('livereload[tiny-lr] listening on %s ...'), config.livereload.port);
        },

        serverLog: function (data) {
            console.log(info(data.trim()));
        },

        serverError: function (data) {
            console.log(error(data.trim()));
        }
    };

    return {
        /**
         * Start/restart a child process by running the script file,
         * this process work as the http(s) server;
         * And start a livereload(tiny-lr) server if it's not started yet.
         *
         * @param {array}                   [args]
         * @param {object}                  [options]
         * @param {boolean|number|object}   [livereload]
         */
        run: function (args, options, livereload) {
            //deal with args
            if(util.isArray(args) && args.length){
                config.args = args;
            }

            //deal with options
            config.options = merge(config.options, options || {});

            //deal with livereload
            if(livereload === false){   //livereload disabled
                config.livereload = false;
            }else if(livereload){
                if(typeof livereload === 'object'){
                    config.livereload = livereload;
                }else{
                    config.livereload.port = livereload;
                }
            }

            if (server) { // server already running
                debug(info('kill server'));
                server.kill('SIGKILL');
                //server.removeListener('exit', callback.serverExit);
                server = undefined;
            } else {
                if(config.livereload){
                    lr = tinylr(config.livereload);
                    lr.listen(config.livereload.port, callback.lrServerReady);
                }
            }

            server = spawn('node', config.args, config.options);
            server.stdout.setEncoding('utf8');
            server.stderr.setEncoding('utf8');

            server.stdout.on('data', callback.serverLog);
            server.stderr.on('data', callback.serverError);
            server.once('exit', callback.serverExit);

            process.listeners('exit') || process.once('exit', callback.processExit);
        },

        /**
         * Stop the server child process and the livereload server
         */
        stop: function () {
            if (server) {
                debug(info('kill server'));
                //use SIGHUP instead of SIGKILL, see issue #34
                server.kill('SIGKILL');
                //server.removeListener('exit', callback.serverExit);
                server = undefined;
            }
            if(lr){
                debug(info('close livereload server'));
                lr.close();
                //TODO how to stop tiny-lr from hanging the terminal
                lr = undefined;
            }
        },

        /**
         * Tell the livereload.js to reload the resources that been changed
         * @param event
         * @returns {*}
         */
        notify: function (event) {
            if(event && event.path){
                var filepath = path.relative(__dirname, event.path);
                debug(info('file(s) changed: %s'), event.path);
                lr.changed({body: {files: [filepath]}});
            }

            return es.map(function(file, done) {
                var filepath = path.relative(__dirname, file.path);
                debug(info('file(s) changed: %s'), filepath);
                lr.changed({body: {files: [filepath]}});
                done(null, file);
            });
        }
    };
})();