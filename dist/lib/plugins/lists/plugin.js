!function(){var e={},t=function(t){for(var n=e[t],o=n.deps,r=n.defn,s=o.length,a=new Array(s),l=0;l<s;++l)a[l]=i(o[l]);var d=r.apply(null,a);if(void 0===d)throw"module ["+t+"] returned undefined";n.instance=d},n=function(t,n,i){if("string"!=typeof t)throw"module id must be a string";if(void 0===n)throw"no dependencies for "+t;if(void 0===i)throw"no definition function for "+t;e[t]={deps:n,defn:i,instance:void 0}},i=function(n){var i=e[n];if(void 0===i)throw"module ["+n+"] was undefined";return void 0===i.instance&&t(n),i.instance},o=function(e,t){for(var n=e.length,o=new Array(n),r=0;r<n;++r)o.push(i(e[r]));t.apply(null,t)};({}).bolt={module:{api:{define:n,require:o,demand:i}}};var r=n,s=function(e,t){r(e,[],function(){return t})};s("global!tinymce.PluginManager",tinymce.PluginManager),s("global!tinymce.util.Tools",tinymce.util.Tools),s("global!tinymce.util.VK",tinymce.util.VK),r("tinymce.lists.core.NodeType",[],function(){var e=function(e){return e&&"BR"===e.nodeName};return{isTextNode:function(e){return e&&3===e.nodeType},isListNode:function(e){return e&&/^(OL|UL|DL)$/.test(e.nodeName)},isListItemNode:function(e){return e&&/^(LI|DT|DD)$/.test(e.nodeName)},isBr:e,isFirstChild:function(e){return e.parentNode.firstChild===e},isLastChild:function(e){return e.parentNode.lastChild===e},isTextBlock:function(e,t){return t&&!!e.schema.getTextBlockElements()[t.nodeName]},isBogusBr:function(t,n){return!!e(n)&&!(!t.isBlock(n.nextSibling)||e(n.previousSibling))},isEmpty:function(e,t,n){var i=e.isEmpty(t);return!(n&&e.select("span[data-mce-type=bookmark]",t).length>0)&&i},isChildOfBody:function(e,t){return e.isChildOf(t,e.getRoot())}}}),s("global!tinymce.dom.TreeWalker",tinymce.dom.TreeWalker),s("global!tinymce.dom.RangeUtils",tinymce.dom.RangeUtils),r("tinymce.lists.core.Selection",["global!tinymce.util.Tools","tinymce.lists.core.NodeType"],function(e,t){return{getSelectedListItems:function(n){return e.grep(n.selection.getSelectedBlocks(),function(e){return t.isListItemNode(e)})}}}),s("global!tinymce.dom.DOMUtils.DOM",tinymce.dom.DOMUtils.DOM),r("tinymce.lists.core.Range",["global!tinymce.dom.RangeUtils","tinymce.lists.core.NodeType"],function(e,t){var n=function(n,i){var o=e.getNode(n,i);return t.isListItemNode(n)&&t.isTextNode(o)?{container:o,offset:i>=n.childNodes.length?o.data.length:0}:{container:n,offset:i}};return{getNormalizedEndPoint:n,normalizeRange:function(e){var t=e.cloneRange(),i=n(e.startContainer,e.startOffset);t.setStart(i.container,i.offset);var o=n(e.endContainer,e.endOffset);return t.setEnd(o.container,o.offset),t}}}),r("tinymce.lists.core.Bookmark",["global!tinymce.dom.DOMUtils.DOM","tinymce.lists.core.NodeType","tinymce.lists.core.Range"],function(e,t,n){return{createBookmark:function(t){var n={},i=function(i){var o,r,s;r=t[i?"startContainer":"endContainer"],s=t[i?"startOffset":"endOffset"],1===r.nodeType&&(o=e.create("span",{"data-mce-type":"bookmark"}),r.hasChildNodes()?(s=Math.min(s,r.childNodes.length-1),i?r.insertBefore(o,r.childNodes[s]):e.insertAfter(o,r.childNodes[s])):r.appendChild(o),r=o,s=0),n[i?"startContainer":"endContainer"]=r,n[i?"startOffset":"endOffset"]=s};return i(!0),t.collapsed||i(),n},resolveBookmark:function(t){function i(n){var i,o,r;i=r=t[n?"startContainer":"endContainer"],o=t[n?"startOffset":"endOffset"],i&&(1===i.nodeType&&(o=function(e){for(var t=e.parentNode.firstChild,n=0;t;){if(t===e)return n;1===t.nodeType&&"bookmark"===t.getAttribute("data-mce-type")||n++,t=t.nextSibling}return-1}(i),i=i.parentNode,e.remove(r)),t[n?"startContainer":"endContainer"]=i,t[n?"startOffset":"endOffset"]=o)}i(!0),i();var o=e.createRng();return o.setStart(t.startContainer,t.startOffset),t.endContainer&&o.setEnd(t.endContainer,t.endOffset),n.normalizeRange(o)}}}),r("tinymce.lists.core.NormalizeLists",["global!tinymce.dom.DOMUtils.DOM","global!tinymce.util.Tools","tinymce.lists.core.NodeType"],function(e,t,n){var i=function(t,i){var o,r=i.parentNode;"LI"===r.nodeName&&r.firstChild===i&&((o=r.previousSibling)&&"LI"===o.nodeName?(o.appendChild(i),n.isEmpty(t,r)&&e.remove(r)):e.setStyle(r,"listStyleType","none")),n.isListNode(r)&&(o=r.previousSibling)&&"LI"===o.nodeName&&o.appendChild(i)};return{normalizeList:i,normalizeLists:function(e,n){t.each(t.grep(e.select("ol,ul",n)),function(t){i(e,t)})}}}),s("global!tinymce.dom.BookmarkManager",tinymce.dom.BookmarkManager),s("global!tinymce.Env",tinymce.Env),r("tinymce.lists.core.TextBlock",["global!tinymce.dom.DOMUtils.DOM","global!tinymce.Env"],function(e,t){return{createNewTextBlock:function(n,i,o){var r,s,a,l=e.createFragment(),d=n.schema.getBlockElements();if(n.settings.forced_root_block&&(o=o||n.settings.forced_root_block),o&&((s=e.create(o)).tagName===n.settings.forced_root_block&&e.setAttribs(s,n.settings.forced_root_block_attrs),l.appendChild(s)),i)for(;r=i.firstChild;){var c=r.nodeName;a||"SPAN"===c&&"bookmark"===r.getAttribute("data-mce-type")||(a=!0),d[c]?(l.appendChild(r),s=null):o?(s||(s=e.create(o),l.appendChild(s)),s.appendChild(r)):l.appendChild(r)}return n.settings.forced_root_block?a||t.ie&&!(t.ie>10)||s.appendChild(e.create("br",{"data-mce-bogus":"1"})):l.appendChild(e.create("br")),l}}}),r("tinymce.lists.core.SplitList",["global!tinymce.dom.DOMUtils.DOM","global!tinymce.util.Tools","tinymce.lists.core.TextBlock","tinymce.lists.core.NodeType"],function(e,t,n,i){return{splitList:function(o,r,s,a){var l,d,c,m;for(c=e.select('span[data-mce-type="bookmark"]',r),a=a||n.createNewTextBlock(o,s),(l=e.createRng()).setStartAfter(s),l.setEndAfter(r),m=(d=l.extractContents()).firstChild;m;m=m.firstChild)if("LI"===m.nodeName&&o.dom.isEmpty(m)){e.remove(m);break}o.dom.isEmpty(d)||e.insertAfter(d,r),e.insertAfter(a,r),i.isEmpty(o.dom,s.parentNode)&&function(n){t.each(c,function(e){n.parentNode.insertBefore(e,s.parentNode)}),e.remove(n)}(s.parentNode),e.remove(s),i.isEmpty(o.dom,r)&&e.remove(r)}}}),r("tinymce.lists.actions.Outdent",["global!tinymce.dom.DOMUtils.DOM","tinymce.lists.core.NodeType","tinymce.lists.core.Bookmark","tinymce.lists.core.Selection","tinymce.lists.core.SplitList","tinymce.lists.core.NormalizeLists","tinymce.lists.core.TextBlock"],function(e,t,n,i,o,r,s){var a=function(n,i){t.isEmpty(n,i)&&e.remove(i)},l=function(n,i){var l,d=i.parentNode,c=d.parentNode;return d===n.getBody()||("DD"===i.nodeName?(e.rename(i,"DT"),!0):t.isFirstChild(i)&&t.isLastChild(i)?("LI"===c.nodeName?(e.insertAfter(i,c),a(n.dom,c),e.remove(d)):t.isListNode(c)?e.remove(d,!0):(c.insertBefore(s.createNewTextBlock(n,i),d),e.remove(d)),!0):t.isFirstChild(i)?("LI"===c.nodeName?(e.insertAfter(i,c),i.appendChild(d),a(n.dom,c)):t.isListNode(c)?c.insertBefore(i,d):(c.insertBefore(s.createNewTextBlock(n,i),d),e.remove(i)),!0):t.isLastChild(i)?("LI"===c.nodeName?e.insertAfter(i,c):t.isListNode(c)?e.insertAfter(i,d):(e.insertAfter(s.createNewTextBlock(n,i),d),e.remove(i)),!0):("LI"===c.nodeName?(d=c,l=s.createNewTextBlock(n,i,"LI")):l=t.isListNode(c)?s.createNewTextBlock(n,i,"LI"):s.createNewTextBlock(n,i),o.splitList(n,d,i,l),r.normalizeLists(n.dom,d.parentNode),!0))};return{outdent:l,outdentSelection:function(e){var t=i.getSelectedListItems(e);if(t.length){var o,r,s=n.createBookmark(e.selection.getRng(!0)),a=e.getBody();for(o=t.length;o--;)for(var d=t[o].parentNode;d&&d!==a;){for(r=t.length;r--;)if(t[r]===d){t.splice(o,1);break}d=d.parentNode}for(o=0;o<t.length&&(l(e,t[o])||0!==o);o++);return e.selection.setRng(n.resolveBookmark(s)),e.nodeChanged(),!0}}}}),r("tinymce.lists.actions.ToggleList",["global!tinymce.util.Tools","global!tinymce.dom.BookmarkManager","tinymce.lists.core.Selection","tinymce.lists.core.NodeType","tinymce.lists.core.Bookmark","tinymce.lists.core.SplitList","tinymce.lists.core.NormalizeLists","tinymce.lists.actions.Outdent"],function(e,t,n,i,o,r,s,a){var l=function(e,t,n){var i=n["list-style-type"]?n["list-style-type"]:null;e.setStyle(t,"list-style-type",i)},d=function(t,n){e.each(n,function(e,n){t.setAttribute(n,e)})},c=function(t,n,i){d(n,i["list-attributes"]),e.each(t.select("li",n),function(e){d(e,i["list-item-attributes"])})},m=function(e,t,n){l(e,t,n),c(e,t,n)},u=function(e,t,n){var o,r,s=e.getBody();for(o=t[n?"startContainer":"endContainer"],r=t[n?"startOffset":"endOffset"],1===o.nodeType&&(o=o.childNodes[Math.min(r,o.childNodes.length-1)]||o);o.parentNode!==s;){if(i.isTextBlock(e,o))return o;if(/^(TD|TH)$/.test(o.parentNode.nodeName))return o;o=o.parentNode}return o},f=function(n,o){for(var r,s=[],a=n.getBody(),l=n.dom,d=u(n,o,!0),c=u(n,o,!1),m=[],f=d;f&&(m.push(f),f!==c);f=f.nextSibling);return e.each(m,function(e){if(i.isTextBlock(n,e))return s.push(e),void(r=null);if(l.isBlock(e)||i.isBr(e))return i.isBr(e)&&l.remove(e),void(r=null);var o=e.nextSibling;t.isBookmarkNode(e)&&(i.isTextBlock(n,o)||!o&&e.parentNode===a)?r=null:(r||(r=l.create("p"),e.parentNode.insertBefore(r,e),s.push(r)),r.appendChild(e))}),s},g=function(t,n,r){var s,a=t.selection.getRng(!0),l="LI",d=t.dom;r=r||{},"false"!==d.getContentEditable(t.selection.getNode())&&("DL"===(n=n.toUpperCase())&&(l="DT"),s=o.createBookmark(a),e.each(f(t,a),function(e){var o,s;(s=e.previousSibling)&&i.isListNode(s)&&s.nodeName===n&&function(e){var t=d.getStyle(e,"list-style-type"),n=r?r["list-style-type"]:"";return n=null===n?"":n,t===n}(s)?(o=s,e=d.rename(e,l),s.appendChild(e)):(o=d.create(n),e.parentNode.insertBefore(o,e),o.appendChild(e),e=d.rename(e,l)),m(d,o,r),L(t.dom,o)}),t.selection.setRng(o.resolveBookmark(s)))},p=function(t){var l=o.createBookmark(t.selection.getRng(!0)),d=t.getBody(),c=n.getSelectedListItems(t),m=e.grep(c,function(e){return t.dom.isEmpty(e)});c=e.grep(c,function(e){return!t.dom.isEmpty(e)}),e.each(m,function(e){i.isEmpty(t.dom,e)&&a.outdent(t,e)}),e.each(c,function(e){var n,o;if(e.parentNode!==t.getBody()){for(n=e;n&&n!==d;n=n.parentNode)i.isListNode(n)&&(o=n);r.splitList(t,o,e),s.normalizeLists(t.dom,o.parentNode)}}),t.selection.setRng(o.resolveBookmark(l))},y=function(e,t){return e&&t&&i.isListNode(e)&&e.nodeName===t.nodeName},N=function(e,t,n){return e.getStyle(t,"list-style-type",!0)===e.getStyle(n,"list-style-type",!0)},v=function(e,t){return e.className===t.className},h=function(e,t,n){return y(t,n)&&N(e,t,n)&&v(t,n)},L=function(e,t){var n,i;if(n=t.nextSibling,h(e,t,n)){for(;i=n.firstChild;)t.appendChild(i);e.remove(n)}if(n=t.previousSibling,h(e,t,n)){for(;i=n.lastChild;)t.insertBefore(i,t.firstChild);e.remove(n)}};return{toggleList:function(e,t,n){var i=e.dom.getParent(e.selection.getStart(),"OL,UL,DL");if(n=n||{},i!==e.getBody())if(i)if(i.nodeName===t)p(e);else{var r=o.createBookmark(e.selection.getRng(!0));m(e.dom,i,n),L(e.dom,e.dom.rename(i,t)),e.selection.setRng(o.resolveBookmark(r))}else g(e,t,n)},removeList:p,mergeWithAdjacentLists:L}}),r("tinymce.lists.core.Delete",["global!tinymce.dom.TreeWalker","global!tinymce.dom.RangeUtils","global!tinymce.util.VK","tinymce.lists.core.Selection","tinymce.lists.core.NodeType","tinymce.lists.core.Bookmark","tinymce.lists.core.Range","tinymce.lists.core.NormalizeLists","tinymce.lists.actions.ToggleList"],function(e,t,n,i,o,r,s,a,l){var d=function(n,i,r){var s,a,l=i.startContainer,d=i.startOffset;if(3===l.nodeType&&(r?d<l.data.length:d>0))return l;for(s=n.schema.getNonEmptyElements(),1===l.nodeType&&(l=t.getNode(l,d)),a=new e(l,n.getBody()),r&&o.isBogusBr(n.dom,l)&&a.next();l=a[r?"next":"prev2"]();){if("LI"===l.nodeName&&!l.hasChildNodes())return l;if(s[l.nodeName])return l;if(3===l.nodeType&&l.data.length>0)return l}},c=function(e,t,n){var i,r,s=t.parentNode;if(o.isChildOfBody(e,t)&&o.isChildOfBody(e,n)){if(o.isListNode(n.lastChild)&&(r=n.lastChild),s===n.lastChild&&o.isBr(s.previousSibling)&&e.remove(s.previousSibling),(i=n.lastChild)&&o.isBr(i)&&t.hasChildNodes()&&e.remove(i),o.isEmpty(e,n,!0)&&e.$(n).empty(),!o.isEmpty(e,t,!0))for(;i=t.firstChild;)n.appendChild(i);r&&n.appendChild(r),e.remove(t),o.isEmpty(e,s)&&s!==e.getRoot()&&e.remove(s)}},m=function(e,t){var n,i,a,m=e.dom,u=e.selection,f=m.getParent(u.getStart(),"LI");if(f){if((n=f.parentNode)===e.getBody()&&o.isEmpty(m,n))return!0;if(i=s.normalizeRange(u.getRng(!0)),(a=m.getParent(d(e,i,t),"LI"))&&a!==f){var g=r.createBookmark(i);return t?c(m,a,f):c(m,f,a),e.selection.setRng(r.resolveBookmark(g)),!0}if(!a&&!t&&l.removeList(e,n.nodeName))return!0}return!1},u=function(e,t){var n=e.dom,i=n.getParent(e.selection.getStart(),n.isBlock);if(i&&n.isEmpty(i)){var o=s.normalizeRange(e.selection.getRng(!0)),r=n.getParent(d(e,o,t),"LI");if(r)return e.undoManager.transact(function(){n.remove(i),l.mergeWithAdjacentLists(n,r.parentNode),e.selection.select(r,!0),e.selection.collapse(t)}),!0}return!1},f=function(e,t){return m(e,t)||u(e,t)},g=function(e){return!!(e.dom.getParent(e.selection.getStart(),"LI,DT,DD")||i.getSelectedListItems(e).length>0)&&(e.undoManager.transact(function(){e.execCommand("Delete"),a.normalizeLists(e.dom,e.getBody())}),!0)},p=function(e,t){return e.selection.isCollapsed()?f(e,t):g(e)};return{setup:function(e){e.on("keydown",function(t){t.keyCode===n.BACKSPACE?p(e,!1)&&t.preventDefault():t.keyCode===n.DELETE&&p(e,!0)&&t.preventDefault()})},backspaceDelete:p}}),r("tinymce.lists.actions.Indent",["global!tinymce.dom.DOMUtils.DOM","tinymce.lists.core.NodeType","tinymce.lists.core.Bookmark","tinymce.lists.core.Selection"],function(e,t,n,i){var o=function(n,i){var o;if(t.isListNode(n)){for(;o=n.firstChild;)i.appendChild(o);e.remove(n)}},r=function(n){var i,r,s;return"DT"===n.nodeName?(e.rename(n,"DD"),!0):(i=n.previousSibling)&&t.isListNode(i)?(i.appendChild(n),!0):i&&"LI"===i.nodeName&&t.isListNode(i.lastChild)?(i.lastChild.appendChild(n),o(n.lastChild,i.lastChild),!0):(i=n.nextSibling)&&t.isListNode(i)?(i.insertBefore(n,i.firstChild),!0):!(!(i=n.previousSibling)||"LI"!==i.nodeName||(r=e.create(n.parentNode.nodeName),(s=e.getStyle(n.parentNode,"listStyleType"))&&e.setStyle(r,"listStyleType",s),i.appendChild(r),r.appendChild(n),o(n.lastChild,r),0))};return{indentSelection:function(e){var t=i.getSelectedListItems(e);if(t.length){for(var o=n.createBookmark(e.selection.getRng(!0)),s=0;s<t.length&&(r(t[s])||0!==s);s++);return e.selection.setRng(n.resolveBookmark(o)),e.nodeChanged(),!0}}}}),r("tinymce.lists.Plugin",["global!tinymce.PluginManager","global!tinymce.util.Tools","global!tinymce.util.VK","tinymce.lists.core.NodeType","tinymce.lists.core.Delete","tinymce.lists.actions.Indent","tinymce.lists.actions.Outdent","tinymce.lists.actions.ToggleList"],function(e,t,n,i,o,r,s,a){var l=function(e,t){return function(){var n=e.dom.getParent(e.selection.getStart(),"UL,OL,DL");return n&&n.nodeName===t}},d=function(e){e.on("BeforeExecCommand",function(t){var n,i=t.command.toLowerCase();if("indent"===i?r.indentSelection(e)&&(n=!0):"outdent"===i&&s.outdentSelection(e)&&(n=!0),n)return e.fire("ExecCommand",{command:t.command}),t.preventDefault(),!0}),e.addCommand("InsertUnorderedList",function(t,n){a.toggleList(e,"UL",n)}),e.addCommand("InsertOrderedList",function(t,n){a.toggleList(e,"OL",n)}),e.addCommand("InsertDefinitionList",function(t,n){a.toggleList(e,"DL",n)})},c=function(e){e.addQueryStateHandler("InsertUnorderedList",l(e,"UL")),e.addQueryStateHandler("InsertOrderedList",l(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",l(e,"DL"))},m=function(e){e.on("keydown",function(t){9!==t.keyCode||n.metaKeyPressed(t)||e.dom.getParent(e.selection.getStart(),"LI,DT,DD")&&(t.preventDefault(),t.shiftKey?s.outdentSelection(e):r.indentSelection(e))})},u=function(e){var n=function(n){return function(){var o=this;e.on("NodeChange",function(e){var r=t.grep(e.parents,i.isListNode);o.active(r.length>0&&r[0].nodeName===n)})}};(function(e,n){var i=e.settings.plugins?e.settings.plugins:"";return-1!==t.inArray(i.split(/[ ,]/),n)})(e,"advlist")||(e.addButton("numlist",{title:"Numbered list",cmd:"InsertOrderedList",onPostRender:n("OL")}),e.addButton("bullist",{title:"Bullet list",cmd:"InsertUnorderedList",onPostRender:n("UL")})),e.addButton("indent",{icon:"indent",title:"Increase indent",cmd:"Indent",onPostRender:function(t){var n=t.control;e.on("nodechange",function(){for(var t=e.selection.getSelectedBlocks(),o=!1,r=0,s=t.length;!o&&r<s;r++){var a=t[r].nodeName;o="LI"===a&&i.isFirstChild(t[r])||"UL"===a||"OL"===a||"DD"===a}n.disabled(o)})}})};return e.add("lists",function(e){return u(e),o.setup(e),e.on("init",function(){d(e),c(e),m(e)}),{backspaceDelete:function(t){o.backspaceDelete(e,t)}}}),function(){}}),i("tinymce.lists.Plugin")()}();