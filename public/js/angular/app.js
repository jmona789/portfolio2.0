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
  .controller("navController",["$scope","$state","$location", "$rootScope", "$timeout", function($scope,$state,$location,$rootScope,$timeout){
    // $scope.home = true;
    // console.log(home.this);
    // console.log($scope);
    
    console.log($state.current);


    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        $state.current = toState;
        console.log(toState);
        if (toState.name === 'home'){
          $scope.home = true;
        }else{
          $scope.home = false;
        }
      }
    )


    // $timeout(
    //   function () { 
    //     console.log(home.this);
    //   }, 100);
    // $timeout(
    //   function () { 
    //     console.log("$state.current:");
    //     console.log($state.current);
    //   }, 100);
    // $scope.uiState = $state
    // console.log("$state.current:");
    // console.log($state.current);
    $scope.isState = function(states){
      
      // return $state.includes(states);
    }; 
}]);