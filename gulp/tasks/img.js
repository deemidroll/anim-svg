var changed    = require('gulp-changed'),
    gulp       = require('gulp'),
    imagemin   = require('gulp-imagemin');

gulp.task('img', function() {
    var dest = './build/img';

    return gulp.src('./src/img/**')
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(dest));
});
