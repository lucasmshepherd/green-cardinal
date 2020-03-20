"use strict";

const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer");

var options = {
  autoprefixer: {
    overrideBrowserslist: [
      "last 3 versions",
      "ie >= 8",
      "ios >= 7",
      "android >= 4.4",
      "bb >= 10"
    ],
    cascade: false
  },
  browsersync: {
    server: "./"
  },
  sass: {
    outFile: "./",
    outputStyle: "compressed",
    sourceMap: true,
    sourceMapEmbed: true
  }
};

gulp.task("serve", () => {
  browserSync.init(options.browsersync);

  gulp
    .watch("src/scss/**/*.scss", gulp.parallel("style"))
    .on("change", browserSync.reload);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
});

gulp.task("style", () => {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass(options.sass).on("error", sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulp.series(["style", "serve"]));
