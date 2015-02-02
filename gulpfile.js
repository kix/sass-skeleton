var gulp = require("gulp")
  , connect = require("gulp-connect")
  , sourcemaps = require('gulp-sourcemaps')
  , coffee = require("gulp-coffee")
  , concat = require("gulp-concat")
  , sass = require("gulp-sass");

var options = {};
options.sass = {
  errLogToConsole: true,
  sourceMap: 'sass',
  sourceComments: 'map',
  precision: 10,
  // imagePath: 'assets/img',
  includePaths: [
    'bower_components/bootstrap-sass/vendor/assets/stylesheets',
  ]
};

gulp.task("styles", [], function () {
	gulp.src(["./src/scss/main.scss"])
	    .pipe(connect.reload())
	    .pipe(sass(options.sass))
	    .pipe(gulp.dest("./build/"));
});

gulp.task("scripts", [], function () {
    gulp.src([{"path":"./src/coffee/*.coffee"}])
        .pipe(coffee())
        .pipe(concat("script.js"))
        .pipe(connect.reload())
        .pipe(gulp.dest("./build/"));
});

gulp.task('html', function () {
  gulp.src('./build/*.html')
      .pipe(connect.reload());
});

gulp.task("watch", [], function () {
    gulp.watch("./src/scss/*.scss", ["styles"]);
    gulp.watch("./web/*.html", ["html"]);
});

gulp.task('connect', [], function () {
  connect.server({
    root: ['./build', './web'],
    port: 8000,
    livereload: true
  });
});

gulp.task('server', ['connect', 'watch']);