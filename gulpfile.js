var gulp = require('gulp'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var image = require('gulp-image');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var config = {
    css: './src/assets/styles/partials/**/*.css',
    mainCss: './src/assets/styles/main.css',
    pug: './src/**/*.pug',
    js: './src/assets/js/*.js',
    images: './src/assets/img/**',
    fonts: 'src/assets/fonts/**',
    html: "./*.html",
    dist: "./public"
};

gulp.task('pug', function() {
    return gulp.src(config.pug)
        .pipe(pug({
            pretty: false
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src(config.mainCss)
        .pipe(
            postcss([
                // require("postcss-easy-import"),
                require('precss')(),
                autoprefixer({ browsers: ['last 2 versions'] })
            ])
        )
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest(config.dist + '/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(config.images)
    .pipe(image())
    .pipe(gulp.dest(config.dist + '/assets/img'));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.dist + '/assets/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(config.js)
        .pipe(gulp.dest(config.dist + '/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });
    gulp.watch(config.pug, function(event) {
        gulp.run('pug');
    });
    gulp.watch([config.css, config.mainCss], function(event) {
        gulp.run('css');
    });
    gulp.watch(config.images, function(event) {
        gulp.run('images');
    });
    gulp.watch(config.fonts, function(event) {
        gulp.run('fonts');
    });
    gulp.watch(config.html).on('change', browserSync.reload);
});
