const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

gulp.task('dev', ['prepare-app', 'watchers'], () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  });
});

gulp.task('build', ['prepare-app'], () => {});

gulp.task('prepare-app', ['clean'], () => {
  gulp.start('build-css', 'build-html', 'build-assets', 'build-js', 'build-libs');
});

gulp.task('watchers', [], () => {
  gulp.watch('./scss/*.scss', ['browserReloadCss']);
  gulp.watch('./js/*.js', ['browserReloadJs']);
  gulp.watch('./index.html', ['browserReloadHtml']);
  gulp.watch('./assets/**/*.*', ['browserReloadAssets']);
});

gulp.task('browserReloadCss', ['build-css'], initReload);
gulp.task('browserReloadJs', ['build-js'], initReload);
gulp.task('browserReloadHtml', ['build-html'], initReload);
gulp.task('browserReloadAssets', ['build-assets'], initReload);

gulp.task('build-css', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('build-js', function() {
  return gulp.src('./js/script.js')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-libs', function() {
  return gulp.src('./libs/*.js')
    .pipe(gulp.dest('./dist/libs'));
});

gulp.task('build-html', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-assets', function() {
  return gulp.src('./assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

function initReload() {
  browserSync.reload();
}

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});
