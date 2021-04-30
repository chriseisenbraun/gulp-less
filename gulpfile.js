// // https://github.com/gulpjs/gulp

var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

var paths = {
  styles: {
    src: 'src/styles/**/styles.less',
    dest: 'css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/scripts/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['assets']);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = watch;
// var gulp = require('gulp');
// var less = require('gulp-less');
// var autoprefixer = require('gulp-autoprefixer');

// var paths = {
//   styles: {
//     src: 'src/styles/**/*.less',
//     dest: 'assets/styles/'
//   }
// };

// /*
//  * Define our tasks using plain functions
//  */
// function styles() {
//   return gulp.src(paths.styles.src)
//     .pipe(less())
//     // pass in options to the stream
//     // .pipe(rename({
//     //   basename: 'main',
//     //   suffix: '.min'
//     // }))
//     .pipe(gulp.dest(paths.styles.dest));
// }

// function auto() {
//   gulp.src('assets/styles/styles.css')
//     .pipe(autoprefixer({
//       cascade: false
//     }))
//     .pipe(gulp.dest(paths.styles.dest));
// }

// function watch() {
//   gulp.watch(paths.styles.src, styles);
// }

// /*
//  * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
//  */
// var build = gulp.series(gulp.parallel(styles));

// /*
//  * You can use CommonJS `exports` module notation to declare tasks
//  */
// // exports.clean = clean;
// exports.styles = styles;
// exports.auto = auto;
// // exports.scripts = scripts;
// exports.watch = watch;
// exports.build = build;
// /*
//  * Define default task that can be called by just running `gulp` from cli
//  */
// exports.default = watch;

// // var gulp = require('gulp');
// // var less = require('gulp-less');

// // gulp.task('less', function() {
// //     return gulp.src('styles.less')  // only compile the entry file
// //         .pipe(less())
// //         .pipe(gulp.dest('./build'))
// // });
// // gulp.task('watch', function() {
// //     gulp.watch('*.less', ['less']);  // Watch all the .less files, then run the less task
// // });

// // gulp.task('default', ['watch']); // Default will run the 'entry' watch task
