"use strict";
const gulp = require('gulp');
const htmlbeautify = require('gulp-html-beautify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const zip = require('gulp-zip');
const twig = require('gulp-twig');


// server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
        notify: false
    });
});
// sass
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('src/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//html
gulp.task('twig', function () {
    return gulp.src('src/twig/*.njk')
        .pipe(twig({path: 'src/twig/'}))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//js
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(twig({path: 'src/js/'}))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// watch files
gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('src/twig/**/*.njk', gulp.series('twig'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});



gulp.task('totalRebuild', gulp.series('sass', 'twig', 'js'));
gulp.task('beforeReady', async function () {
    gulp.src('src/*.html')
        .pipe(htmlbeautify({
            "indent_size": 1,
            "indent_level": 0
        }))
        .pipe(gulp.dest('public/'))
    gulp.src([
        'src/assets/css/**/*.css'
    ])
        .pipe(gulp.dest('public/assets/css'))
    gulp.src([
        'src/assets/scripts/script.js'
    ])
        .pipe(gulp.dest('public/assets/scripts'))
    gulp.src([
        'src/assets/vendors/**/*.css'
    ])
        .pipe(gulp.dest('public/assets/vendors'))
    // gulp.src([
    //     'src/assets/vendors/**/*.js'
    // ])
    //     .pipe(gulp.dest('public/assets/vendors'))
    gulp.src('src/images/**/*')
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('public/images'))
    gulp.src('./src/index_files/**/*')
        .pipe(gulp.dest('./public/index_files/'));
    gulp.src('./public/**/*')
        .pipe(zip('test.zip'))
        .pipe(gulp.dest('./'));

    gulp.src('./public/**/*').pipe(gulp.dest('./../VNIKAY-PUBLIC/'));


});



// dev
gulp.task('d', gulp.series('totalRebuild', gulp.parallel('watch', 'server')));


// build
gulp.task('b', gulp.series('totalRebuild', 'beforeReady'));

