// var url = require('url');

// //GET ACCESS TOKEN
// FB.api('oauth/access_token', {
//     client_id: 'app_id',
//     client_secret: 'app_secret',
//     grant_type: 'client_credentials'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
    
//     var accessToken = res.access_token;
//     console.log(accessToken);
// });


// // ### Exchange code for access token
// FB.api('oauth/access_token', {
//     client_id: '1707645142804590',
//     client_secret: 'c279a5fe804dec8c1216b7eccbefc625',
//     redirect_uri: 'http://localhost:3000/login/callback',
//     code: 'code'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }

//     var accessToken = res.access_token;
//     var expires = res.expires ? res.expires : 0;
// });

// // You can safely extract the code from the url using the `url` module. Always make sure to handle invalid oauth callback as
// // well as error.

// var urlToParse = 'http://yoururl.com/callback?code=.....#_=_';
// var result = url.parse(urlToParse, true);


// if(result.query.error) {
//     if(result.query.error_description) {
//         console.log(result.query.error_description);
//     } else {
//         console.log(result.query.error);
//     }
//     return;
// } else if (!result.query.code) {
//     console.log('not a oauth callback');
//     return;
// }

// var code = result.query.code;