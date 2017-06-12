var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['sass', 'minify-css'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch("scss/*.scss", ['sass', 'minify-css']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'));
});
