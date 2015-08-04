/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    обьявляем переменные и зависимости
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

var gulp         = require('gulp');
var jade         = require('gulp-jade');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var csso         = require('gulp-csso');
var prettify     = require('gulp-prettify');
var cmq          = require('gulp-combine-media-queries');

var coffee       = require('gulp-coffee');
var ftp          = require( 'vinyl-ftp' );

var browserSync  = require('browser-sync');
var reload       = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        open: false
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача для компиляции jade файлов
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('jade', function(){
    gulp.src('./jade/!(_)*.jade')
        .pipe(jade({pretty: true}))
    .on('error', console.log)
    .pipe(prettify({
        indent_size: 2,
        unformatted: ['pre', 'code']
    }))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream:true}));
});

gulp.task( 'upload', function() {

    var conn = ftp.create( {
        host:     'ftp.vaeum.com',
        user:     'u510625194.test',
        password: 'testtest',
        parallel:  1
    } );

    var globs = [
        './build/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './build/', buffer: false } )
        // .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/calc' ) );
} );

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача для компиляции scss файлов
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('sass', function () {
    gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
            ))
        .pipe(cmq())
        .pipe(csscomb())
        // .pipe(csso())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    компилирование coffee файлов
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/


gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}));
});

/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    список файлов для наблюдения
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./jade/**/*.jade', ['jade']);
    gulp.watch('./coffee/**/*.coffee', ['coffee']);
    gulp.watch('./build/js/**/*.js', ['reload']);
});


/**
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    задача по-умолчанию
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

gulp.task('default',
    [
        'watch',
        'sass',
        'jade',
        'browser-sync',
        'coffee'
    ]
);
