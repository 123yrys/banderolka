const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require("gulp-nunjucks-html");
const browserSync = require("browser-sync").create();
var gulpCopy = require('gulp-copy');


const SCSS_FOLDER = "./assets/style/**/*.scss";
const TEMPALTES_FOLDER = "./templates/**/*.html";

gulp.task("sass", function(cb) {
    return gulp

        .src("./scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.stream());
});

gulp.task("nunjucks", function(cb) {
    gulp
        .src("./templates/*.nj")
        .pipe(nunjucks({
            searchPaths: ['./templates/chunks', './templates/layout'],
            ext: '.html'
        }))
        .pipe(gulp.dest("./build"))
    browserSync.reload();
    cb()
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch('./scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./templates/**/*.nj', gulp.parallel('nunjucks'))
});

gulp.task('gulp-copy-img', function() {
    return gulp
        .src(['./assets/images/**'])
        .pipe(gulp.dest('./build/assets/images'));
})
gulp.task('gulp-copy-fonts', function() {
    return gulp
        .src(['./assets/fonts/**'])
        .pipe(gulp.dest('./build/assets/fonts'));
})

// gulp.task(
//   "build",
//   gulp.series(
//     "clean",
//     gulp.parallel("gulp-copy", "sass", "nunjucks", "browser-sync")
//   )
// );