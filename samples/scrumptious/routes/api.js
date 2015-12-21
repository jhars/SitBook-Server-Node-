var FB              = require('../../../fb'),
config          = require('../config'),
Firebase        = require("firebase"),
ref             = new Firebase("https://sitterbookapi.firebaseio.com/users");

exports.friends = function (req, res) {
    ref.orderByKey().on("child_added", function(snapshot) {
        var tempUserID = snapshot.key();
        console.log("current User ID above");
        
        snapshot.forEach(function(data) {
            var currentUserID = snapshot.key();
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
                var targetMutualFriends = result.context.all_mutual_friends.data;
                var myID = currentUserID
                var socialContextRoute = "https://sitterbookapi.firebaseio.com/users/" + myID
                var socialContextRef = new Firebase(socialContextRoute);
                socialContextRef.child('/fbfriends/first-degree').set(targetMutualFriends);
                console.log(targetMutualFriends);
                var appUserFirstDegreeFriends = ["bob","sally","Joe"]
                socialContextRef.child('/fbfriends/first-deg-App').set(appUserFirstDegreeFriends);
                console.log("result02");
     // ============ LOGIC ================ //
                // var appUserFirstDegData = result.context.all_mutual_friends.data;
                // var myID = currentUserID

                //iterate through "result" (friends list)
                // if 
     // ============ LOGIC ================ //
     // ============ LOGIC ================ //
     // ============ LOGIC ================ //
     // ============ LOGIC ================ //
     // ============ LOGIC ================ //
        res.send(result);
            });
    console.log("XXX", tempUserID);
        });//  - - - - - - -  END FOR-EACH LOOP - - - - - - - - -  //
    });
};
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
//================================================================////================================================================//
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

//================================================================//
//================================================================//
//================================================================//
//================================================================//