module.exports = function() {
  $.gulp.task('video', () => {
      return $.gulp.src('./dev/static/video/**/*.*')
          .pipe($.gulp.dest('./build/app/video/'));
  });
};