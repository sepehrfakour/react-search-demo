const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const less = require('gulp-less-sourcemap');
const replace = require('gulp-replace');

const webpackDevServerUrl = 'http://localhost:8080';

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: "."
    });
});

// Watching scss/less/html files
gulp.task('watch', ['serve', 'sass', 'less'], function() {
    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/less/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/scss/*.scss")
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'scss'
    }))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Compile LESS into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src("assets/less/*.less")
    .pipe(less({
      sourceMap: {
        sourceMapRootpath: './assets/less' // Optional absolute or relative path to your LESS files
      }
    }))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Prepare app.js bundle path for production
gulp.task('production-js', function(){
    var filenames = [
        './index.html'
    ];
    filenames.forEach( function (name) {
        gulp.src([name], {base: './'})
            .pipe(replace( webpackDevServerUrl + '/app.js', '/assets/js/app.js'))
            .pipe(gulp.dest('./'));
    });
});
// Prepare app.js bundle path for development
gulp.task('dev-js', function(){
    var filenames = [
        './index.html'
    ];
    filenames.forEach( function (name) {
        gulp.src([name], {base: './'})
            .pipe(replace('/assets/js/app.js', webpackDevServerUrl + '/app.js'))
            .pipe(gulp.dest('./'));
    });
});


gulp.task('default', ['serve']);
gulp.task('server', ['serve']);
gulp.task('dev', ['dev-js','watch'], function () {
    console.log('Asset paths ready for development');
});
gulp.task('production', ['production-js'], function () {
    console.log('Asset paths ready for production');
});
