const path = require('path');
const fs = require('fs-extra');
const gulp = require('gulp');
const gutil = require('gutil');
const rename = require('gulp-rename');
const less = require('gulp-less');
const csso = require('gulp-csso');
const cssInlineImages = require('gulp-css-inline-images');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const src = path.resolve(__dirname, '../public');
const dist = path.resolve(__dirname, '../docs');
const lessroot = path.resolve(__dirname, '../less');

// css tasks
gulp.task('css.less', () => {
  fs.removeSync(path.resolve(dist, 'css'));

  return gulp
    .src(path.resolve(lessroot, 'index.less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename(function(path) {
      if( path.dirname === '.' ) path.basename = 'style';
      else path.basename = path.dirname, path.dirname = '.';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(cssInlineImages({
      webRoot: path.dirname(lessroot),
      path: '/' + path.basename(lessroot)
    }))
    .pipe(gulp.dest(path.join(dist, 'css')));
});

gulp.task('css.min', ['css.less'], () => {
  return gulp.src(path.join(dist, '/css/*.css'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }));
});

gulp.task('css', ['css.min']);

// copy tasks
gulp.task('copy.images', () => {
  fs.removeSync(path.resolve(dist, 'images'));

  return gulp.src(src + '/images/**/*')
    .pipe(gulp.dest(dist + '/images'));
});

gulp.task('copy.font', ['copy.images'], () => {
  fs.removeSync(path.resolve(dist, 'font'));

  return gulp.src(src + '/font/**/*')
    .pipe(gulp.dest(dist + '/font'));
});

gulp.task('copy.icon', ['copy.font'], () => {
  fs.removeSync(path.resolve(dist, 'favicon.*'));

  return gulp.src(src + '/favicon.*')
    .pipe(gulp.dest(dist));
});

gulp.task('copy', ['copy.icon']);


// global tasks
gulp.task('css.watch', () => {
  gulp.watch([__filename, lessroot + '/less/**/*'], ['css']);
});

gulp.task('build', ['css', 'copy']);
gulp.task('build.watch', ['css.watch']);

// conclusion
gulp.task('watch', ['build.watch']);
gulp.task('default', ['build']);

