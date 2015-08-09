'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    Config = require('./gulpfile.config');

var config = new Config();

gulp.task('gen-ts-refs', function () {

    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            console.log(filepath);
            return '/// <reference path="../../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});