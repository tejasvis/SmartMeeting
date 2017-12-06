myApp.controller('MeetingsController',['$scope','$rootScope','$firebaseAuth','$firebaseArray',
function($scope,$rootScope,$firebaseAuth,$firebaseArray){
    
// creating a reference to firebase database
var ref=firebase.database().ref();

//variable for authentication
var auth=$firebaseAuth();


auth.$onAuthStateChanged(function(authUser){
    if(authUser){
        var meetingsRef=ref.child('users').child(authUser.uid).child('meetings');
        var meetingsInfo=$firebaseArray(meetingsRef); //fecthing the  data from the firebase database as an firebase array
        
        $scope.meetings=meetingsInfo;//storing it in a local variable to display all the meetings list when the user logs in
       
        meetingsInfo.$loaded().then(function(data){
            $rootScope.countMeetings=meetingsInfo.length;
        });//meetings info is loaded from the database once.

        meetingsInfo.$watch(function(data){
        $rootScope.countMeetings=meetingsInfo.length; 
        });// looks for the changes in the meetings info variable-if new meeting come and add up, then it gets updated

        $scope.addMeeting=function(){
            meetingsInfo.$add({// this allows to push new data into firebase
               name:$scope.meetingName ,
               date: firebase.database.ServerValue.TIMESTAMP, 
            }).then(function(){
                $scope.meetingName=""; //clear the input text field after meeting name is sent to database
            });//promise
        };//addMeeting

        $scope.deleteMeeting=function(key){
            meetingsInfo.$remove(key);
        }//delete meeting


    }// if the user logged in is an authorized user
    
});//if user logs in, that results in state change


    }]);//meetings controller