
var FB              = require('../../../fb'),

    config          = require('../config');
var Firebase        = require("firebase");

var ref             = new Firebase("https://sitterbookapi.firebaseio.com/users")

// var tempUserID;


exports.readAPI = function (req, res) {
// ref.orderByKey().on("child_added", function(snapshot) {
//     console.log(snapshot.key());
//     var currentUserID = snapshot.key();
//     tempUserID = currentUserID;
//     console.log(tempUserID);
//     res.send(snapshot.key());
// });
};





exports.friends = function (req, res) {

    var tempUserID;

    ref.orderByKey().on("child_added", function(snapshot) {
    // console.log(snapshot.key());
    var currentUserID = snapshot.key();
    tempUserID = currentUserID;


    snapshot.forEach(function(data) {

    var mutual_friends_API_call = tempUserID + '?fields=context.fields%28all_mutual_friends.limit%28100%29%29'
    console.log(mutual_friends_API_call)

    FB.api(mutual_friends_API_call, {
        limit:          250,
        access_token:   req.session.access_token
    }, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        console.log("result01");
        console.log(result.context.all_mutual_friends.data);
        console.log("result02");

        var targetMutualFriends = result.context.all_mutual_friends.data;
        var myID = tempUserID

        var socialContextRoute = "https://sitterbookapi.firebaseio.com/users/" + myID

        var socialContextRef = new Firebase(socialContextRoute);
    socialContextRef.child('fbfriends/mutual-friends').set(targetMutualFriends);
    // socialContextRef.child('last').set('Flintstone');




     // ============ LOGIC ================ //




        res.send(result);
    });



    // console.log("The " + data.key() + " dinosaur's score is " + data.val());
    console.log("XXX", tempUserID);
      });

});
    // var mutual_friends_API_call = tempUserID + '?fields=context.fields%28all_mutual_friends.limit%28100%29%29'

};

//===================================================//

exports.search = function (req, res) {
    var parameters              = req.query;
    parameters.access_token     = req.session.access_token;
    FB.api('/search', req.query, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        res.send(result);
    });
};

exports.announce = function (req, res) {
    var parameters              = req.body;
    parameters.access_token     = req.session.access_token;
    FB.api('/me/' + config.facebook.appNamespace +':eat', 'post', parameters , function (result) {
        if(!result) {
            return res.send(500, 'error');
        } else if(result.error) {
            if(result.error.type == 'OAuthException') {
                result.redirectUri = FB.getLoginUrl({ scope: 'user_about_me,publish_actions', state: encodeURIComponent(JSON.stringify(parameters)) });
            }
            return res.send(500, result);
        }

        res.send(result);
    });
};