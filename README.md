A quick extension I needed in [markdown-cms](https://github.com/choelea/markdown-cms) to parse markdown to html.
joe-marked combines [meta-markdown](https://david-dm.org/j201/meta-marked) and markdown-toc to enhance [marked](https://www.npmjs.com/package/marked). 
> OOTB (Out Of The Box),When header is with such as Chinese characters, anchor of TOC (table of content) could not work properly. Id of header that marked parses from markdown content could be different with the anchor of TOC. joe-marked uses base64 on both markdown-toc and marked to resolve this issue.

joe-marked exposes 2 functions: marked and fetchMeta. marked 'inherits' [marked](https://www.npmjs.com/package/marked), The marked function behaves exactly the same as [marked](https://www.npmjs.com/package/marked), except for the following:

- Instead of returning a parsed string, meta-marked returns an object with the following properties:
    - meta contains the metadata object or null if metadata isn't found
    - html contains the parsed HTML
    - markdown contains the text of the markdown section of the string
- marked.noMeta is a reference to the [marked](https://www.npmjs.com/package/marked) function, so it can be used to avoid parsing metadata.

Function fetchMeta is used in case that only meta of the content is needed, don't need parse the whole makrdown content. `fetchMeta(content)` will only return the meta object.
# Example

```
---
Title:   My awesome markdown file
Author:  Me
Scripts:
    - js/doStuff.js
    - js/doMoreStuff.js
...

##Header
Regular text and stuff goes here.
```
Above content could be parsed into object with properties: meta, html and markdown.
```
var { marked,fetchMeta } = require('joe-marked');
var basicResult = marked(content, { toc: true });
```
The basicResult object will be like: 
```
{
    "meta": {
        "Title": "My awesome markdown file",
        "Author": "Me",
        "Scripts": [
            "js/doStuff.js",
            "js/doMoreStuff.js"
        ]
    },
    "html": "<ul>\n<li><a href=\"#6ZyA6KaB6Kej5Yaz55qECOmXrumimA%3D%3D\">需要解决的\b问题</a></li>\n</ul>\n<h2 id=\"6ZyA6KaB6Kej5Yaz55qECOmXrumimA==\">需要解决的\b问题</h2>\n<p>To sovlve issues: xxx</p>\n",
    "markdown": "\n\n## 需要解决的\b问题\nTo sovlve issues: xxx"
}
```