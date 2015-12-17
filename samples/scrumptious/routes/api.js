
var FB              = require('../../../fb'),

    config          = require('../config');

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

exports.friends = function (req, res) {
    FB.api('1734329503463628?fields=context.fields%28all_mutual_friends.limit%28100%29%29', {
        // fields:         'name,picture',
        limit:          250,
        access_token:   req.session.access_token
    }, function (result) {
        if(!result || result.error) {
            return res.send(500, 'error');
        }
        console.log("result01");
        console.log(result.context.all_mutual_friends.data);
        console.log("result02");
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
