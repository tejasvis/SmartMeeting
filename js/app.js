var myApp=angular.module('myApp',['ngRoute','firebase']);
myApp.run(['$rootScope','$location',function($rootScope,$location){
    $rootScope.$on('$routeChangeError',function(event,next,previous,error){
        if(error == 'AUTH_REQUIRED'){
            $rootScope.message="Sorry! You must login to access the page.";
            $location.path("/login")
        }//auth required
    });
}]);//run
myApp.config(['$routeProvider',function($routeProvider){
$routeProvider
    .when('/login',{
        templateUrl:'views/login.html',
        controller:'RegistrationController'
    })
    .when('/register',{
        templateUrl:'views/register.html',
        controller:'RegistrationController'
    })
    .when('/checkins/:uId/:mId',{
        templateUrl:'views/checkins.html',
        controller:'CheckinsController'
    })
    .when('/checkins/:uId/:mId/checkinsList',{
        templateUrl:'views/checkinsList.html',
        controller:'CheckinsController'
    })
    .when('/meetings',{
        templateUrl:'views/meetings.html',
        controller:'MeetingsController',
        resolve:{
            currentAuth:function(Authentication){
                return Authentication.requireAuth();
            }//currentAUth
        }//resolve
    })
    .otherwise({
        redirectTo:'/login'
    })
}]);


/*
myApp.controller("appController",['$scope',function($scope){
$scope.message="welcome to my App";
}]);*/