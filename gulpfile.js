var gulp = require('gulp'),
    print = require('gulp-print'),
    nodemon = require('gulp-nodemon'),
    babel = require('gulp-babel');

// build application
gulp.task('build', ['js', 'html', 'assets']);

// build and serve in dev environment
gulp.task('serve', ['build', 'watch'], function() {
    gulp.run('server')
});

gulp.task('server', function() {
    nodemon({
        script: 'build/index.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('js', function() {
    return gulp.src('src/**/*.js')
        .pipe(print())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build'));
});

gulp.task('html', function() {
    return gulp.src('src/client/index.html')
        .pipe(print())
        .pipe(gulp.dest('build/client/'));
});

gulp.task('assets', function() {
    return gulp.src('src/client/*' + '.png')
        .pipe(print())
        .pipe(gulp.dest('build/client/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['build']);
});
