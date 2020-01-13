const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
// var devip = require("dev-ip");
// devip(); // [ "192.168.1.76", "192.168.1.80" ] or false if nothing found (ie, offline user)
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "src"
    },
    host: "192.168.1.1"

    // online: true
    // tunnel: true
  });
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function() {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      rename({
        prefix: "",
        suffix: ".min"
      })
    )
    .pipe(autoprefixer())
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function() {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
