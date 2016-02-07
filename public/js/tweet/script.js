$(document).ready(function(){ 
  $("blockquote").addClass("tweetText");
  var blockquoteLink = $("<a>").addClass("tweetThis").attr("target", "_blank");
  $("blockquote").wrap(blockquoteLink);
  var tweetBtn = $("<img/>").attr("src", "/static/images/tweet/twitter.png");
  var tweetText = $(".tweetText").html();
  var currentUrl = window.location;
  function cutQuote(){
    if (tweetText.length > 104){
      $("blockquote").prepend(tweetBtn);
      return tweetText.slice(0, 101) +'...';
    }
    else{
      $("blockquote").prepend(tweetBtn);
      return tweetText;
    }
  }
  $(".tweetThis").attr("href", "http://twitter.com/intent/tweet?text="+cutQuote()+" "+currentUrl);
});