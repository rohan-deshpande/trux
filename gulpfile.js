// trux gulpfile

//util

var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');
var paths = {
    'vendor':[
        'bower_components/qwest/qwest.min.js',
        'bower_components/eventEmitter/EventEmitter.min.js'
    ],
    'app':'source/*.js',
    'com':{
        'src':'source/com/*.js',
        'dest':'source/com'
    },
    'dist':'dist/'
};

gulp.task('lib', function () {
    return gulp.src(paths.vendor)
    .pipe(concat('lib.com.js'))
    .pipe(gulp.dest(paths.com.dest));
});

gulp.task('app', function () {
    return gulp.src(paths.app)
    .pipe(concat('app.com.js'))
    .pipe(gulp.dest(paths.com.dest));
});

gulp.task('build', ['app'], function () {
    return gulp.src(paths.com.src)
    .pipe(order([
        'lib.com.js',
        'app.com.js'
    ]))
    .pipe(concat('trux.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
    gulp.watch([paths.app], ['build']);
});

gulp.task('default', ['build', 'watch']);
