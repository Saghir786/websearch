var Crawler = require("simplecrawler");

//Validate arguments
var args = process.argv.slice(2);
if(args.length<2){
    console.log('Usage: node search.js <site> <search words>');
    return;
}

//Pick out search term and URL from arguments passed
var search_term=process.argv.slice(3).join(' ');
var start_url = args[0];
if (!start_url.includes('http')){
    start_url = 'http://'+start_url;
}
console.log('Searching site '+start_url+' for: '+search_term);

var crawler = Crawler(start_url)
    .on("fetchcomplete", function (queueItem, responseBody, response) {
        if(responseBody.includes(search_term)){
            console.log(queueItem.url);
        }
    });

//Configuration    
crawler.decodeResponses = true; 
crawler.allowInitialDomainChange = false; 
//We are only interested in actual pages that contain text so limit what is parsed 
crawler.downloadUnsupported = false;
crawler.supportedMimeTypes = [ /^text\/html/i ];

crawler.start();