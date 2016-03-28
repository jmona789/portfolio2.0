angular.module("Profile", ["ui.router"])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("404", {
        url: "/404",
        templateUrl: "/views/404.html"
      })
      .state("home", {
        url: "/",
        templateUrl: "/views/home.html"
      })
      .state("youtube", {
        url: "/youtubeNchill",
        templateUrl: "/views/youtube.html"
      })
      .state("tweet", {
        url: "/Tweet-This-Article",
        templateUrl: "/views/tweet.html"
      })
      .state("rps", {
        url: "/Rock-Paper-Scissors",
        templateUrl: "/views/rps.html"
      })
    $locationProvider.html5Mode(true);
  }])
  .controller("githubController", ["$scope","$http", function($scope, $http){

    function buildLinks(repos) {
      var links = [];
      repos.forEach(function(repo) {  
        var commitsApiUrl = "https://api.github.com/repos/";
        commitsApiUrl += repo.owner.login + "/";
        commitsApiUrl += repo.name + "/commits";
        links.push({
          commitsApiUrl: commitsApiUrl,
          full_name: repo.full_name
        });
      });
    return links;
  }

    $http({
      method: "GET",
      url: "https://api.github.com/users/jmona789/repos?sort=pushed"
    }).then(function(repos) {
        $scope.links = buildLinks(repos.data)
      },
      function(jqXHR, textStatus, errorThrown) {
        alert("Something went wrong. We are looking into it!");
      });
    function buildListGroup(repoData) {
      var commitsApiUrl = "https://api.github.com/repos/";
      commitsApiUrl += repoData.owner.login + "/";
      commitsApiUrl += repoData.name + "/commits";
      
      var newLink = $("<a>")
        .attr("url", commitsApiUrl)
        .attr("ng-click", 'buildCommits()')
        .addClass("list-group-item")
        .append(repoData.full_name);
      return newLink;
    }
    
    $scope.buildCommits = function(url){
      $.ajax({
        type: "GET",
        url: url,
        success: function(commits) {
          $("tbody").empty();
          for(var i = 0; i < commits.length; i++) {
            $("tbody").append(buildTableRow(commits[i]));
          }
        }
      })
      function buildTableRow(commitData) {
        var commitUrl = commitData.html_url;
        var shaTd = $("<td>").append($("<a href="+commitUrl+">").html(commitData.sha).attr("target", "_blank"));
        var authorTd = $("<td>").append(commitData.author.login);
        var messageTd = $("<td>").append(commitData.commit.message);
        var dateTd = $("<td>").append(commitData.commit.author.date);
        
        
        
        return $("<tr>").append(shaTd)
          .append(authorTd)
          .append(messageTd)
          .append(dateTd);
      }
    }
  }])
  .controller("navController",["$scope","$state","$location", "$rootScope", "$timeout", function($scope,$state,$location,$rootScope,$timeout){
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $state.current = toState;
        if (toState.name === 'home'){
          $scope.home = true;
          // buildGitHubPanel();
        }else{
          $scope.home = false;
        }
      }
    )
}]);