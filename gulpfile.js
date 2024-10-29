'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import del from 'del';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import usemin from 'gulp-usemin';
import rev from 'gulp-rev';
import cleanCss from 'gulp-clean-css';
import flatmap from 'gulp-flatmap';
import htmlmin from 'gulp-htmlmin';

// Task to compile Sass
gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// Watch Sass files and run the 'sass' task on change
gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});

// Browser Sync for live reloading
gulp.task('browser-sync', function () {
    browserSync.create().init({
        server: {
            baseDir: './'
        }
    });

    // Watch files and reload browser on changes
    gulp.watch(['./*.html', './css/*.css', './img/*.{jpg,png,gif}', './js/*.js']).on('change', browserSync.reload);
});

// Clean task to delete the 'dist' folder
gulp.task('clean', function() {
    return del(['dist']);
});

// Copy fonts task
gulp.task('copyfonts', function(){
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}')
        .pipe(gulp.dest('./dist/fonts'));
});

// Image minification task
gulp.task('imagemin', function(){
    return gulp.src('./img/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('./dist/images'));
});

// Usemin task to minify HTML, CSS, and JS
gulp.task('usemin', function(){
    return gulp.src('./*.html')
        .pipe(flatmap(function(stream, file){
            return stream
                .pipe(usemin({
                    css: [cleanCss(), rev()],
                    html: [function() { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }));
        }))
        .pipe(gulp.dest('./dist/'));
});

// Build task to run clean, copyfonts, imagemin, and usemin in sequence
gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts', 'imagemin', 'usemin')));

// Default task to run browser-sync and sass:watch in parallel
gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));