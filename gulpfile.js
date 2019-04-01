var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    include = require('gulp-include'),
    webserver = require('gulp-webserver'),
    Promise = require('bluebird'),
    Rename = require('gulp-rename'),
    fs = require('fs'),
    _ = require('lodash');

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('site/css'));
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
          livereload: true,
          open: true,
          fallback: 'index.html',
          host: 'localhost'
    }));
});
gulp.task('script', function () {
    return gulp
        .src([
            'src/js/**/*.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('site/js'));


});

var pages = [];
var raw = fs.readdirSync('src/html/Pages');
_.each(raw, function (p){
    var dirname = p.split('.')[0];
    var path  = dirname =='index' ? '' : '' + dirname + '/';
    var file =  path;
    var page = {
        src: p,
        dest: file
    };
    pages.push(page);
});
gulp.task('html', function(){
   var promises = [];
    _.each(pages, function (page){
        
        promises.push(
            gulp
            .src('src/html/Pages/' + page.src)
            .pipe(include())
            .pipe(Rename('index.html'))
            .pipe(gulp.dest(page.dest))
        );
    });
     return Promise.all(promises);
});


gulp.watch = function (path, task){

    gulp.src(path)
        .pipe(watch(path, function() {
            gulp.run(task);
        }));
};
gulp.task('watch', ['script'], function () {
    gulp.watch(['src/js/**/*.js'], ['script']);
    gulp.watch(['src/less/**/*.less'], ['less']);
    gulp.watch(['src/html/**/*.html'], ['html']);
});

gulp.task('default', ['watch', 'less', 'html', 'webserver']);
