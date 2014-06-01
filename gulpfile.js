var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var es = require('event-stream');
var browserify = require('gulp-browserify');

var paths = {
  views: ['src/views/**/*.jade', 'src/index.jade'],
  styles: ['src/css/*.less'],
  scripts: ['src/js/**/*.js'],
};

gulp.task('views', function() {
  return gulp.src('src/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('www/views'));
});

gulp.task('index', function() {
  return gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('www'));
});

gulp.task('styles', function(){
  return es.concat(
    gulp.src('src/css/*.less').pipe(less()),
    gulp.src('vendor/flat-ui-official/css/flat-ui.css'),
    gulp.src('vendor/flat-ui-official/bootstrap/css/bootstrap.css'),
    gulp.src('vendor/fontawesome/css/font-awesome.min.css'),
    gulp.src('vendor/normalize-css/normalize.css')
  ).pipe(gulp.dest('www/css'));
});

gulp.task('fonts', function(){
  return es.concat(
    gulp.src('vendor/flat-ui-official/fonts/**/*'),
    gulp.src('vendor/fontawesome/fonts/FontAwesome.otf'),
    gulp.src('vendor/fontawesome/fonts/fontawesome-webfont.eot'),
    gulp.src('vendor/fontawesome/fonts/fontawesome-webfont.svg'),
    gulp.src('vendor/fontawesome/fonts/fontawesome-webfont.ttf'),
    gulp.src('vendor/fontawesome/fonts/fontawesome-webfont.woff')
  ).pipe(gulp.dest('www/fonts'));
});

gulp.task('scripts', function(){
  return gulp.src('src/js/app.js')
  			.pipe(browserify({
                insertGlobals : true,
                debug : true
         	})).pipe(gulp.dest('www/js'));
});

gulp.task('images', function(){
  return es.concat(
    gulp.src('vendor/flat-ui-official/images/**/*.png')
  ).pipe(gulp.dest('www/images'));
});

gulp.task('watch', [], function(){

  gulp.run('styles', 'views', 'index', function end() {
    gulp.watch(paths.styles,   ['styles']);
    gulp.watch(paths.views,   ['views', 'index']);
    gulp.watch(paths.scripts,   ['scripts']);
  });

  console.log('I\'m watching you');
});