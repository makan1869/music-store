var mainApp = angular.module("musicStore", ["ngAudio","angularUtils.directives.dirPagination"]);

mainApp.controller("contentExploreController", function($scope, $http) {
    var url = "http://localhost:3000/api/content/explore?offset=0&max=12";
    $http.get(url).success(function(response) {
        $scope.content_explore = response;
    });
});

mainApp.controller("contentShowController", function($scope, $http, ngAudio) {
    var url = "http://localhost:3000/api/content/show/";
    var paramStr = window.location.search;
    paramStr = paramStr.slice(paramStr.indexOf("=") + 1);
    $http.get(url + paramStr).success(function(response) {
        $scope.content_show = response;
        $scope.curSong = ngAudio.load($scope.content_show.sample); // returns NgAudioObject
        /*
        $scope.options = {
            playlist: [$scope.content_show.sample],
            loop: true
        };
        */
        console.log($scope.curSong);
        // console.log($scope.options);
    });
});

mainApp.controller("contentAlbumController", function($scope, $http) {
    var url = "http://localhost:3000/api/content/album/";
    var paramStr = window.location.search;
    $scope.currentPage = 1;
    $scope.pageSize = 3;
    paramStr = paramStr.slice(paramStr.indexOf("=") + 1);
    $http.get(url + paramStr).success(function(response) {
        $scope.content_album = response;
    });
});

mainApp.controller("paginateController" , function($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('songs page changed to ' + num);
    };
});

/*
//You need to add 'ngRoute' as a dependency in your app
angular.module('ngApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        //configure the routing rules here
        $routeProvider.when('/backend/:type/:id', {
            controller: 'PagesCtrl'
        });

        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode(true);
    })
    .controller('PagesCtrl', function ($rootScope, $scope, $routeParams, $route) {
        //If you want to use URL attributes before the website is loaded
        $rootScope.$on('$routeChangeSuccess', function () {
            console.log($routeParams.id);
            console.log($routeParams.type)
        });
    });
*/
