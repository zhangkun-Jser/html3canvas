'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');

const DEST = 'dist/';

gulp.task('clean',  function() {	
	gulp.src('dist/**/*.js',{read:false})
		.pipe(rimraf());	
});


gulp.task('compress', ['clean'], function() {	
	gulp.src(['src/**/*.js'])
		.pipe(gulp.dest(DEST));		
});

gulp.task('default', ['clean','compress'], function() {});