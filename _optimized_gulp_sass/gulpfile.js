var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create();

gulp.task('browser-sync', ['styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });
    gulp.watch('sass/*.sass', ['styles']);
		gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('app'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync']);
