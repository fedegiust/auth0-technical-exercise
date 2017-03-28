var express = require('express');
var passport = require('passport');
var Sequence = exports.Sequence || require('sequence').Sequence
  , sequence = Sequence.create()
  , err
  ;
var request = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
    sequence
        .then(function (next) {
            let options = { method: 'POST',
                url: 'https://federico.auth0.com/oauth/token',
                headers: { 'content-type': 'application/json' },
                body: '{"client_id":"yMl69DXKUoJl3VhjIa66uQO2S2LIKdL7","client_secret":"1i8myRHMSeAd4tuppF8gLXcB6aYToZeF8Z7LrGHKNzgAYeUlqD-j2zPLf12Mny-N","audience":"https://federico.auth0.com/api/v2/","grant_type":"client_credentials"}' };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                let jsonBody = JSON.parse(body);
                next(err, jsonBody.access_token);
          });
        })
        .then(function (next, err, a, b) {
            let options = { method: 'GET',
                url: 'http://federico.auth0.com/api/v2/rules',
                headers: { authorization: 'Bearer ' + a } };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                body = JSON.parse(body);
                let regex = /(clientName\s*\W*'(.*)')/gmi;
                let appNames = [];
                for(let rule of body){
                    let str = rule.script;
                    let m;
                    if(/(clientName\s*\W*'(.*)')/gmi.test(str)) {
                        while ((m = regex.exec(str)) !== null) {
                            // This is necessary to avoid infinite loops with zero-width matches
                            if (m.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }

                            // The result can be accessed through the `m`-variable.
                            m.forEach((match, groupIndex) => {
                                if(groupIndex === 2){
                                    appNames.push({ order: rule.order, id: rule.id, enabled: rule.enabled, name: match});
                                }
                            });
                        }
                    } else {
                        appNames.push({ order: rule.order, id: rule.id, enabled: rule.enabled, name: 'Generic rule'});
                    }
                }
                next(err, appNames);
            });
        })
        .then(function (next, err, a, b) {
            res.render('user', { pageData: { user: req.user, appNames: a } });
        });
});

module.exports = router;
