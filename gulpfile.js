"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-minify-css");
var rename = require("gulp-rename");
var copyDir = require('copy-dir');
var copy = require('copy');


gulp.task("css", function() {
  return gulp.src("sass/style.{sass,scss}")
    .pipe(plumber())
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({
        browsers: "last 2 versions"
      })
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
});

// =====================================================
// Start task
// =====================================================
gulp.task("start", ["css"], function() {
  gulp.watch("sass/**/*.{sass,scss}", ["css"]);
});

// Оставьте эту строку в самом конце файла
require("./.gosha");
