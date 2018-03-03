/* © 2013-2014 j201
* https://github.com/choelea/joe-marked */

var marked = require('marked');
var yaml = require('js-yaml');
var toc = require('markdown-toc');
var customize = require('./customize')
// Splits the given string into a meta section and a markdown section if a meta section is present, else returns null
function splitInput(str) {
	if (str.slice(0, 3) !== '---') return;

	var matcher = /\n(\.{3}|-{3})/g;
	var metaEnd = matcher.exec(str);

	return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
}

var metaMarked = function (src, opt, callback) {
	if (Object.prototype.toString.call(src) !== '[object String]')
		throw new TypeError('First parameter must be a string.');

	var mySplitInput = splitInput(src);
	var strToc = ''
	if (opt && opt.toc) {
		var tocOpt = opt.tocOpt || {}
		var tableOfContents = toc(mySplitInput ? mySplitInput[1] : src, Object.assign(tocOpt, customize.tocOpt));
		if (tableOfContents.content) {
			strToc = tableOfContents.content + '\n\n';
		}
	}
	var markedOpt = Object.assign(opt || {}, customize.markedOpt)
	return mySplitInput ? {
		meta: yaml.safeLoad(mySplitInput[0]),
		html: marked(strToc + mySplitInput[1], markedOpt, callback),
		markdown: mySplitInput[1]
	} : {
			meta: null,
			html: marked(strToc + src, markedOpt, callback),
			markdown: src
		};
};

metaMarked.__proto__ = marked; // Yeah, it's non-standard, but it's better than copying everything over

metaMarked.noMeta = marked;

module.exports = metaMarked;
