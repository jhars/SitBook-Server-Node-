
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '1707645142804590',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'c279a5fe804dec8c1216b7eccbefc625',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'sitboook',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;
