var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');


gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./src/*.js'])
    .pipe(browserified)
    //.pipe(uglify())
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'app.js', ext: 'js', ignore: ['./src/*.js'] });
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'nodemon', 'watch']);
