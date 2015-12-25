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
var concat = require('gulp-concat');

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
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("js", function() {
  gulp.src('source/js/*.js')
    .pipe(concat('script.js'))
    .pipe(jsmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js/'))
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
    .pipe(gulp.dest('build/img/'));
});
gulp.task('watch', function() {
    gulp.watch("source/sass/**/*", ["css"])
    gulp.watch("source/js/*.js", ["js"])
    gulp.watch("source/img/", ["img"])
  })
  // =====================================================
  // Start task
  // =====================================================
gulp.task('build', ['css', 'js', 'html', 'img']);
// Оставьте эту строку в самом конце файла
require("./.gosha");
