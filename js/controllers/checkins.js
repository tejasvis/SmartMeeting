myApp.controller("CheckinsController", ['$scope', '$location','$routeParams', '$firebaseObject', '$firebaseArray',
    function ($scope,$location, $routeParams, $firebaseObject, $firebaseArray) {


        var ref,checkinsList;

        $scope.meetingId = $routeParams.mId;
        $scope.userId = $routeParams.uId;

        ref = firebase.database().ref().child('users').child($scope.userId).
            child('meetings').child($scope.meetingId).child('checkins');

        checkinsList=$firebaseArray(ref);
        $scope.checkins=checkinsList;
        $scope.order='firstname';
        $scope.direction=null;
        $scope.query='';
        $scope.recordId='';

        $scope.pickRandom=function(){
            var recordInfo=Math.round(Math.random()*(checkinsList.length-1));
            $scope.recordId=checkinsList.$keyAt(recordInfo);//picks the specific element based on the record num retrieved
        }// pick a random checked in user

        $scope.showLove=function(myCheckin){
            myCheckin.show=!myCheckin.show;
            if(myCheckin.userState=='expanded'){
                myCheckin.userState='';
            }
            else{
                myCheckin.userState='expanded';
            }
        }//toggles the value of show based on show love button clicked
        $scope.giveLove=function(myCheckin,myGift){
            var refLove=ref.child(myCheckin.$id).child('awards');
            var checkinsArray=$firebaseArray(refLove);

            checkinsArray.$add({
                name:myGift,
                date:firebase.database.ServerValue.TIMESTAMP,
            });
        }// give some nice comments to each checked in user 
        $scope.deleteLove=function(myCheckin,myCheckinKey){
            var refLove=ref.child(myCheckin.$id).child('awards').child(myCheckinKey);
            var checkInObject=$firebaseObject(refLove);
            
            checkInObject.$remove(myCheckinKey);
            
        }//delete the comments given to each checked in user

        $scope.addCheckin= function(){
            $firebaseArray(ref).$add({ //add metthod to store values in firebase database
                firstname: $scope.user.firstname,
                lastname:$scope.user.lastname,
                email:$scope.user.email,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function(){
                $location.path('/checkins/'+$scope.userId+'/'+$scope.meetingId+'/checkinsList')
            })
        }//add check in method

        $scope.deleteCheckin=function(id){

         var refDelete=ref.child(id);
         var refDeleteRecord= $firebaseObject(refDelete);
         refDeleteRecord.$remove(id);
        }//delete a particular checkin
    }]);