"use strict";

const gulp = require("gulp");
const minify = require("gulp-minify");
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const purge = require("gulp-css-purge");

const sass = gulpSass(nodeSass);

gulp.task("default", watch);

gulp.task("sass", compileSass);

gulp.task("js", compressJs);

function compileSass() {
  return (
    gulp
      .src("src/scss/**/*.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      // .pipe(purge())
      .pipe(gulp.dest("src/css"))
  );
}

function compressJs() {
  return gulp
    .src("src/js/src/**/*.js")
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest("src/js/min"));
}

function watch() {
  gulp.watch("src/scss/**/*.scss", compileSass);
  gulp.watch("src/js/src/**/*.js", compressJs);
}
