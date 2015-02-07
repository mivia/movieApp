// Gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');

// Dodac skrypty z bower_components i user defined
var scripts = [
	'./app/bower_components/jquery/dist/jquery.js',
	'./app/bower_components/angular/angular.js',
	'./app/bower_components/bootstrap/dist/js/bootstrap.js',
	'./src/js/scripts.js'
];

var watch_scripts = './src/js/scripts.js';

var watch_styles = ['./src/styles/main.scss', './src/styles/components/*.scss', './src/styles/varables/*.scss'];

util.log('stuff happened', 'Really it did', util.colors.cyan('123'));

// Tasks
gulp.task('styles', function(){
	gulp.src('./src/styles/main.scss')
		.pipe(sass({precision: 10}))
		.pipe(prefix())
		.pipe(minifyCss())
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('./app/css/'));
});

gulp.task('scripts', function(){
	gulp.src(scripts)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./app/js/'));
});


gulp.task('watch', function() {
  gulp.watch(watch_scripts, ['scripts']);
  gulp.watch(watch_styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);