/* © 2013-2014 j201
* https://github.com/choelea/joe-marked */

var marked = require('marked');
var yaml = require('js-yaml');
var toc = require('markdown-toc');

// Splits the given string into a meta section and a markdown section if a meta section is present, else returns null
function splitInput(str) {
	if (str.slice(0, 3) !== '---') return;

	var matcher = /\n(\.{3}|-{3})/g;
	var metaEnd = matcher.exec(str);

	return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
}

var metaMarked = function(src, opt, callback) {
	if (Object.prototype.toString.call(src) !== '[object String]')
		throw new TypeError('First parameter must be a string.');

	var mySplitInput = splitInput(src);
	var toc=''
	if(opt && opt.toc){
		var tableOfContents = toc(markObj.markdown, { maxdepth: 4, slugify });
		if (tableOfContents.content) {
			toc = tableOfContents.content + '\n\n';
		}
	}

	return mySplitInput ?  {
			meta : yaml.safeLoad(mySplitInput[0]),
			html : marked(toc + mySplitInput[1], opt, callback),
			markdown: mySplitInput[1]
		} : {
			meta : null,
			html : marked(toc + src, opt, callback),
			markdown: src
		};
};

metaMarked.__proto__ = marked; // Yeah, it's non-standard, but it's better than copying everything over

metaMarked.noMeta = marked;

module.exports = metaMarked;
