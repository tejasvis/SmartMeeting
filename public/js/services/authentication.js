myApp.factory('Authentication', ['$rootScope','$location', '$firebaseAuth','$firebaseObject',
    function ($rootScope,$location, $firebaseAuth,$firebaseObject) {

        // creating a reference to firebase database
        var ref = firebase.database().ref();

        //variable for authentication
        var auth = $firebaseAuth();

        var myObj;
        //to detect when the user has logged in
        auth.$onAuthStateChanged(function(authUser){
            if(authUser){
                var userRef=ref.child('users').child(authUser.uid);
                var userObj=$firebaseObject(userRef);
                $rootScope.currentUser=userObj;
            }else{
                $rootScope.currentUser='';
            }
        });

        myObj= {
            login: function (user) {
                auth.$signInWithEmailAndPassword(user.email,user.password)
                .then(function(user){
                    $location.path('/meetings')
                })
                .catch(function(error){
                  $rootScope.message=error.message;  
                });//signInWithEmailAndPassword
               // $rootScope.message = "Welcome  " + $rootScope.user.email + "  to registration";
            },//login

            logout: function(){
                return auth.$signOut();
            },//logout
            
            requireAuth:function(){
                return auth.$requireSignIn();
            },//require authentication

            register: function (user) {

                //using fire base methods to register user
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                    .then(function (regUser) {
                        var regRef=ref.child('users')//a path to a directory/subdirectory
                                .child(regUser.uid) //a path to different users data, uid is given by firebase automatically
                                .set({  //firebase set method to send the information to the database
                                    date : firebase.database.ServerValue.TIMESTAMP,
                                    regUser:regUser.uid,
                                    firstname:user.firstname,
                                    lastname:user.lastname,
                                    email:user.email
                                }) //user info to be stored in firebase database
                       // $rootScope.message = "Welcome  " + user.firstname + " " + user.lastname + ". Thanks for registering!!";
                    myObj.login(user);
                    }).catch(function (error) {
                        $rootScope.message = error.message;
                    });

            }//register
        }; //return to a factory
        return myObj;
    }]);//factory