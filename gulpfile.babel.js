import gulp from "gulp";
import gulpSass from "gulp-sass";
import sass from "sass";
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";
import rename from "gulp-rename";
import del from "del";
import browserify from "gulp-browserify";

export function html() {
  return gulp.src("src/**/*.html").pipe(gulp.dest("dest/"));
}

export function styles() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(gulpSass(sass)())
    .pipe(cleanCSS())
    .pipe(concat("style.min.css", { newLine: "" }))
    .pipe(gulp.dest("dest/"));
}

export function scripts() {
  return gulp
    .src("src/scripts/main.js", { sourcemaps: true })
    .pipe(
      browserify({
        transform: ["babelify"],
        paths: ["./src/scripts/"],
      })
    )
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("dest/"));
}

export function watch() {
  gulp.watch("src/styles/**/*.scss", styles);
  gulp.watch("src/**/*.html", html);
  gulp.watch("src/scripts/**/*.js", scripts);
}

export function clean() {
  return del(["dest"]);
}

export const build = gulp.series(clean, gulp.parallel(html, styles, scripts));

export default build;
