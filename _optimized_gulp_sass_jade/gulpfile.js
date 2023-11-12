import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg

import browserSync   from 'browser-sync'
import gulpSass      from 'gulp-sass'
import * as dartSass from 'sass'
const  sass          = gulpSass(dartSass)
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import concat        from 'gulp-concat'
import rename        from 'gulp-rename'
import uglify        from 'gulp-uglify'
import autoprefixer  from 'autoprefixer'
import jadeModule    from 'gulp-jade'

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}

function scripts() {
	return src([
		'app/libs/modernizr/modernizr.js',
		'app/libs/jquery/jquery-1.11.2.min.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/plugins-scroll/plugins-scroll.js',
		])
	.pipe(concat('libs.js'))
	.pipe(uglify()) // // Minify libs.js
	.pipe(dest('app/js'))
	.pipe(browserSync.stream())
}

function styles() {
	return src(['sass/**/*.sass'])
		.pipe(sass({
			'include css': true,
			includePaths: ['app/libs/bourbon/core']
		}))
		.pipe(postCss([
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function jade() {
	return src(['jade/**/*.jade'])
	.pipe(jadeModule())
	.pipe(dest('app'))
	.pipe(browserSync.stream())
}

function startwatch() {
	watch(['sass/**/*.sass'], { usePolling: true }, styles)
	watch(['app/js/common.js', 'app/libs/**/*.js'], { usePolling: true }, scripts)
	watch(['jade/*.jade'], { usePolling: true }, jade);
	watch(['app/*.html'], { usePolling: true }).on('change', browserSync.reload)
}

export { scripts, styles, jade }
export let assets = series(scripts, styles, jade)

export default series(scripts, styles, jade, parallel(browsersync, startwatch))
