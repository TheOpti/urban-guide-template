const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const minify = require('gulp-minify');
const clean = require('gulp-clean');


gulp.task('browser-sync', ['sass', 'minify-css', 'inject-js'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});


gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('watch', ['browser-sync'], function() {
  gulp.watch("scss/*.scss", ['sass', 'minify-css']);
  gulp.watch("js/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('minify-css', ['sass'], function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'));
});


gulp.task('build-css', ['clean'], function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
});


gulp.task('build-js', ['clean', 'build-html'], function() {
  return gulp.src('./dist/index.html')
    .pipe(inject(gulp.src(['./js/script.js']).pipe(minify({noSource : true})), {
      transform: function (filePath, file) {
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('inject-js', function() {
  const source = gulp.src('./js/script.js');

  return gulp.src('index.html')
    .pipe(inject(source))
    .pipe(gulp.dest('./'));
});


gulp.task('build-html', ['clean'], function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'));
});


gulp.task('build-assets', ['clean'], function() {
  return gulp.src('./assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});


gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});


gulp.task('build', ['clean', 'build-html', 'build-assets', 'build-css', 'build-js'], function() {});
