var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var webserver = require('gulp-webserver');
var pug = require('gulp-pug');
var watch = require('gulp-watch');

gulp.task('webserver', function() {
 gulp.src('public')
    .pipe(webserver({
      fallback: 'index.html'
    }));
});

gulp.task('styles', function () {
  gulp
    .src('resources/index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
})

gulp.task('pug',function() {
 return gulp.src('resources/views/*.pug')
 .pipe(pug({
    doctype: 'html',
    pretty: false
 }))
 .pipe(gulp.dest('./public/'));
})


gulp.task('assets', function () {
  gulp
    .src('resources/assets/*')
    .pipe(gulp.dest('public'));
})

function compile(watch) {
  var bundle = browserify('./resources/views/index.js', {debug: true});

  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', function () {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle() {
    bundle
      .transform(babel, { presets: [ 'es2015' ], plugins: [ 'syntax-async-functions', 'transform-regenerator' ] })
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end') })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () { return compile(true); });

gulp.task('default', ['styles', 'assets', 'build', 'pug', 'webserver']);
