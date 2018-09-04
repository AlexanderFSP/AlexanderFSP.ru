'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      notify       = require("gulp-notify"),
      browserSync  = require('browser-sync').create(),
      reload       = browserSync.reload,
      prettify     = require('gulp-html-prettify'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin       = require('gulp-cssmin'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      babel        = require('gulp-babel'),
      rename       = require('gulp-rename'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify');

const path = {
  build: {
    html: './build/',
    css: './build/css/',
    js:  './build/js/',
    img: './build/img/'
  },
  src: {
    html: './src/*.html',
    scss: './src/scss/**/*.scss',
    js: {
      base: './src/js/script.js',
      baseTranspiled: './src/js/_script.js',
      jQuery: './src/js/jquery-3.3.1.min.js'
    },
    img:  './src/img/**/*.*'
  },
  watch: {
    html: './src/*.html',
    scss: './src/scss/**/*.scss',
    js:   './src/js/**/*.js',
    img:  './src/img/**/*.*'
  },
  clean: './build/**/*.*'
};

/**
 *  Очистка сборочной директории
 */
gulp.task('clean', function(cb) {
  del(path.clean).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    notify('Очистка сборочной директории');
    cb();
  });
});

/**
 *  Обработка HTML и перенос в path.build.html
 */
gulp.task('html:build', function() {
  return gulp.src(path.src.html)
            .pipe(prettify({
              indent_char: ' ',
              indent_size: 2
            }))
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({stream: true}))
            .pipe(notify('Обработка HTML и перенос в path.build.html'));
});

/**
 *  Компиляция SASS в CSS, добавление библиотеки Normalize.css, установка префиксов и перенос в path.build.css
 */
gulp.task('scss:build', function() {
  return gulp.src(path.src.scss)
            .pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
            .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
            }))
            .pipe(cssmin())
            .pipe(gulp.dest(path.build.css))
            .pipe(reload({stream: true}))
            .pipe(notify('Компиляция SASS в CSS, добавление библиотеки Normalize.css, установка префиксов и перенос в path.build.css'));
});

/**
 *  Транспиляция JS в ES5
 */
gulp.task('js:transpile', function() {
  return gulp.src(path.src.js.base)
            .pipe(babel())
            .pipe(rename('_script.js'))
            .pipe(gulp.dest('./src/js/'));
});

/**
 *  Слияние jQuery и базовых скриптов в один файл, минификация и перенос в path.build.js
 */
gulp.task('js:build', gulp.series('js:transpile', function() {
  return gulp.src([
              path.src.js.jQuery,
              path.src.js.baseTranspiled
            ])
            .pipe(concat('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.build.js))
            .pipe(reload({stream: true}));
}));

/**
 *  Оптимизация изображений и перенос в path.build.img
 */
gulp.task('image:build', function() {
  return gulp.src(path.src.img)
            .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()],
              interlaced: true
            }))
            .pipe(gulp.dest(path.build.img))
            .pipe(reload({stream: true}))
            .pipe(notify('Оптимизация изображений и перенос в path.build.img'));
});
      
/**
 *  Общая задача сборки проекта в ./build/
 */
gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'scss:build', 'js:build', 'image:build')));

/**
 *  Запуск сервера
 */
gulp.task('webserver', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    notify: false
  });
});

/**
 *  Наблюдение за изменениями
 */
gulp.task('watch', function() {
  gulp.watch(path.watch.html, gulp.task('html:build'));
  gulp.watch(path.watch.scss, gulp.task('scss:build'));
  gulp.watch(path.watch.js,   gulp.task('js:build'));
  gulp.watch(path.watch.img,  gulp.task('image:build'));
});

/**
 *  Задача по умолчанию: сборка, запуск сервера и наблюдения
 */
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')));