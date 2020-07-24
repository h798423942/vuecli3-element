var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
var merge = require('merge-stream');

var customThemeName='.custom-theme1'

gulp.task('css-wrap', function() {
    let theme1 = gulp.src( path.resolve('./src/assets/skins/skin1/index.css'))
        .pipe(cssWrap({selector: customThemeName}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/assets/theme/theme1'));

    let theme2 = gulp.src( path.resolve('./src/assets/skins/skin2/index.css'))
        .pipe(cssWrap({selector: '.custom-theme2'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/assets/theme/theme2'))
    return merge(theme1, theme2);
});

gulp.task('move-font', function() {
    let font1 = gulp.src(['./src/assets/skins/skin1/fonts/**'])
                .pipe(gulp.dest('src/assets/theme/theme1/fonts'));
    let font2 = gulp.src(['./src/assets/skins/skin2/fonts/**'])
                .pipe(gulp.dest('src/assets/theme/theme2/fonts'));
    return merge(font1, font2);
});

gulp.task('default',gulp.series(['css-wrap','move-font']));
// gulp.task('default',['css-wrap','move-font']);
