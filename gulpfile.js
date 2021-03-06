'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      browserSync  = require('browser-sync').create(),
      reload       = browserSync.reload,
      prettify     = require('gulp-html-prettify'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util'),
      jshint       = require('gulp-jshint'),
      babel        = require('gulp-babel'),
      rename       = require('gulp-rename'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify'),
      newer        = require('gulp-newer');

const path = {
  build: {
    html: './build/',
    css: './build/css/',
    js: './build/js/',
    img: './build/img/',
    sounds: './build/sounds/',
  },
  src: {
    html: './src/*.html',
    scss: './src/scss/**/*.scss',
    js: {
      base: './src/js/script.js',
      baseTranspiled: './src/js/_script.js',
      jQuery: './src/js/jquery-3.3.1.min.js',
    },
    img: './src/img/**/*.*',
    sounds: './src/sounds/*.wav',
  },
  clean: './build',
};

/**
 *  Очистка сборочной директории
 */
gulp.task('clean', cb => {
  del([path.clean]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    cb();
  });
});

/**
 *  Обработка HTML и перенос в path.build.html
 */
gulp.task('html:build', () => {
  return gulp.src(path.src.html)
            .pipe(prettify({
              indent_char: ' ',
              indent_size: 2
            }))
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({ stream: true }));
});

/**
 *  Компиляция SASS в CSS, импорт CSS-библиотек, установка префиксов и перенос в path.build.css
 */
gulp.task('scss:build', () => {
  return gulp.src(path.src.scss)
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(path.build.css))
            .pipe(reload({ stream: true }));
});

/**
 *  Транспиляция JS в ES5
 */
gulp.task('js:transpile', () => {
  return gulp.src(path.src.js.base)
            .pipe(plumber())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(babel())
            .on('error', (err) => {
              gutil.log(gutil.colors.red('[Compilation Error]'));
              gutil.log(gutil.colors.red(err.message));
            })
            .pipe(rename('_script.js'))
            .pipe(gulp.dest('./src/js/'));
});

/**
 *  Слияние jQuery и базовых скриптов в один файл, минификация и перенос в path.build.js
 */
gulp.task('js:concat', () => {
  return gulp.src([
              path.src.js.jQuery,
              path.src.js.baseTranspiled
            ])
            .pipe(concat('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.build.js))
            .pipe(reload({ stream: true }));
});

/**
 * Удаление транспилированного JS, после сборки и переноса всех скриптов в path.build.js
 */
gulp.task('js:clean', cb => {
  del(path.src.js.baseTranspiled).then(() => {
    console.log('Deleted file: _script.js');
    cb();
  });
});

/**
 *  Сборка скриптов
 */
gulp.task('js:build', gulp.series('js:transpile', 'js:concat', 'js:clean'));

/**
 *  Оптимизация изображений и перенос в path.build.img
 */
gulp.task('image:build', () => {
  return gulp.src(path.src.img)
            .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()],
              interlaced: true
            }))
            .pipe(gulp.dest(path.build.img))
            .pipe(reload({ stream: true }));
});

/**
 *  Copy sounds into './build/sounds' folder
 */
gulp.task('sounds:copy', () => {
  return gulp.src(path.src.sounds)
    .pipe(newer(path.build.sounds))
    .pipe(gulp.dest(path.build.sounds))
    .pipe(reload({ stream: true }));
});

/**
 *  Общая задача сборки проекта в ./build/
 */
gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'scss:build', 'js:build', 'image:build', 'sounds:copy')));

/**
 *  Запуск сервера
 */
gulp.task('webserver', () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    notify: false
  });
});

/**
 *  Наблюдение за изменениями
 */
gulp.task('watch', () => {
  gulp.watch(path.src.html, gulp.task('html:build'));
  gulp.watch(path.src.scss, gulp.task('scss:build'));
  gulp.watch(path.src.js.base, gulp.task('js:build'));
  gulp.watch(path.src.img, gulp.task('image:build'));
  gulp.watch(path.src.sounds, gulp.task('sounds:copy'));
});

/**
 *  Задача по умолчанию: сборка, запуск сервера и наблюдения
 */
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')));
