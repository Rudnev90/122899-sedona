"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var copyDir = require('copy-dir');
var copy = require('copy');
var jsmin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyCss = require('gulp-minify-css');

gulp.task("css", function() {
  gulp.src("source/sass/style.{sass,scss}")
    .pipe(plumber())
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({
        browsers: "last 2 versions"
      })
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
  return gulp.src("build/css/*.css")
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("js", function() {
  gulp.src('source/js/*.js')
    .pipe(gulp.dest("build/js"))
    .pipe(jsmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js/'));
  return gulp.src('source/js/vendor/*.js')
    .pipe(gulp.dest('build/js/vendor/'));
});

gulp.task("html", function() {
  gulp.src('source/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task("img", function() {
  gulp.src('source/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
  gulp.watch("source/sass/style.{sass,scss}", ["css"])
  gulp.watch("build/js/*.js", ["js"])
  gulp.watch("build/img/", ["img"])
})

// =====================================================
// Start task
// =====================================================
gulp.task('start', ['css', 'js', 'html', 'img', 'watch']);
// Оставьте эту строку в самом конце файла
require("./.gosha");
