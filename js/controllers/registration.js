myApp.controller('RegistrationController',['$scope','Authentication',
function($scope,Authentication){
//$scope.message="Welcome to registration";



$scope.login=function(){
   Authentication.login($scope.user);
};
$scope.logout=function(){
    Authentication.logout();
};//logout
$scope.register=function(){
   Authentication.register($scope.user);
    
};//register function
}]);//controller