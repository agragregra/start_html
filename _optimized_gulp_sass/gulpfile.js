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
      silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'color-functions', 'global-builtin', 'import'],
      loadPaths: ['./']
    }))
    .pipe(postCss([
      autoprefixer({ grid: 'autoplace' }),
      cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
    ]))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function startwatch() {
  watch(['sass/**/*.sass'], { usePolling: true }, styles)
  watch(['app/js/common.js', 'app/libs/**/*.js'], { usePolling: true }, scripts)
  watch(['app/*.html'], { usePolling: true }).on('change', browserSync.reload)
}

export { scripts, styles }
export let assets = series(scripts, styles)

export default series(scripts, styles, parallel(browsersync, startwatch))
