HackerNewsNodeModule
====================

Just a wee module to help out with a project - grabs the most recent stuff from hacker news every 5 mins.

===

###0.0.0

The way I have it set up currently:

 * In middleware.js:  
`var newsScrape = require('HackerNewsScrape');`   
 * In exports.initLocals:  
`locals.hotnews = newsScrape.hotnews;`

Then in the jade tempate

```
-var hotNews = eval("( " + locals.hotnews + ")");
-for (var i = 0; i < 10; i ++) {
	li
		a(href=hotNews.hits[i].url, target="_blank")= 
							hotNews.hits[i].title
-}
```
you could just do `each hit in hotNews.hits` but I was only after 10, not the full 60(ish - I think) articles that it gets. 

===
If anyone else is interested, or if any future projects use this I'll probably look into formatting and sanitising the hotnews variable, it's just a string at the moment which is why the jade is evaluating it into JSON.