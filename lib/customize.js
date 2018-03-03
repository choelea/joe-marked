
'use strict';

var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level, raw) {
    return '<h'
        + level
        + ' id="'
        + Buffer.from(text).toString('base64')
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
};

var slugify = function (str) {
    return Buffer.from(str).toString('base64')
}
exports.markedOpt = { renderer };
exports.tocOpt = { maxdepth: 4, slugify }
