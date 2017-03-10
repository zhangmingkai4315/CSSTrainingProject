var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve',
            'gulp-autoprefixer':'autoprefixer',
            'gulp-livereload':'livereload',
        }
    });
 

gulp.task('auto-prefixer', function() {
       return gulp.src('src/*.css')
            .on('error', function (err) {
                gutil.log(err);
                this.emit('end');
            })
            .pipe(plugins.autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
            .pipe(gulp.dest('build')).on('error', gutil.log)
            .pipe(plugins.livereload());
    }); 
gulp.task('watch', function() {
  gulp.watch('src/*.css', ['auto-prefixer']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('/', 8888);
    server.start();
    gulp.watch(['build/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});
// Run "gulp server"
gulp.task('default', ['serve', 'watch']);