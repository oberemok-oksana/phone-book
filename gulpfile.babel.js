import gulp from "gulp";
import gulpSass from "gulp-sass";
import sass from "sass";
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";

export function html() {
  return gulp.src("src/**/*.html").pipe(gulp.dest("dest/"));
}

export function styles() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(gulpSass(sass)())
    .pipe(cleanCSS())
    .pipe(concat("style.min.css", { newLine: "" }))
    .pipe(gulp.dest("dest/styles/"));
}

export function watch() {
  gulp.watch("src/styles/**/*.scss", styles);
  gulp.watch("src/**/*.html", html);
}

export const build = gulp.parallel(html, styles);

export default build;
