
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    // KEY: 5439442389ce4a628d3d6f054d4538af
    // YOUR CODE GOES HERE!
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=washington%20dc&api-key=5439442389ce4a628d3d6f054d4538af&sort=newest
    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&q=" + cityStr;
    url += '&' + $.param({
      'api-key': "5439442389ce4a628d3d6f054d4538af"
    });

    $.getJSON(url, function(data){

      $nytHeaderElem.text('New York Times Articles About ' + cityStr);

      articles = data.response.docs;
      for (var i=0; i<articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p></li>');
      };
    }).error(function(e){
      $nytHeaderElem.text('New York Times Articles Could Not Be Found');

    });

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
