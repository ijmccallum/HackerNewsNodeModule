/**
 * Grab the stuff on Hacker news every 5 mins
 *
 * @req http
 *
 * @return {String}
 * @return {JSON} (soon!)
 */
var http = require('http');
console.log("HackerNews: hello");
getHackerNews();
repeateGet();

/**
 * Makes the http request to hacker news
 * calls updateHotNews()
 */
function getHackerNews(){
  console.log("HackerNews: Getting news"); 
  var hNews = '';

  var options = {
      host: 'hn.algolia.com',
      path: '/api/v1/search_by_date?tags=story'
  };


  var callback1 = function(response) {

      response.on('data', function (chunk) {
          hNews += chunk;
      });
      response.on('end', function () {
        console.log("HackerNews: News aquired: " + hNews.length);
        updateHotNews(hNews);
      });
  }

  var HNreq = http.request(options, callback1).end();
}

/**
 * Calles getHackerNews() every 30 seconds
 */
function repeateGet() {
  setInterval(function() { 
  getHackerNews();
  }, 300000); //every 5 mins
}

/**
 * Updates the exported variable
 */
function updateHotNews(hNews) {
  console.log("HackerNews: Updating hotnews");
  module.exports.hotnews = hNews;
}


module.exports = {

  /**
   * Escapes special characters in the given string of html.
   */
  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Unescape special characters in the given string of html.
   *
   * @param  {String} html
   * @return {String}
   */
  unescape: function(html) {
    return String(html)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
};