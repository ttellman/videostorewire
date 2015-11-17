var gulp       = require('gulp'),
    jade       = require('gulp-jade'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify'),
    gulpIf     = require('gulp-if'),
    sass       = require('gulp-sass'),
    connect = require('gulp-connect-multi')();


var outputDir = 'builds/public';

gulp.task('jade', function() {
    return gulp.src('src/templates/**/*.jade')
      .pipe(jade())
      .pipe(gulp.dest(outputDir))
      .pipe(connect.reload());
});

gulp.task('js', function(){
  return browserify('src/js/main.js').bundle()

    .pipe(source('bundle.js'))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('src/sass/main.scss')
  .pipe(sass({sourceComments: 'map'}))
  .pipe(gulp.dest(outputDir + '/css'))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  //gulp.watch('src/templates/**/*.jade', ['jade']);
  //gulp.watch('src/js/**/*.js', ['js']);
  //gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('connect', connect.server({
  root: ['builds/public'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'google-chrome'
  }
}));

gulp.task('default', ['watch', 'connect' ]);
