import { Router } from 'express';
import facets from './facets';
import bodyParser from 'body-parser';
import Parse from 'parse/node';
import * as constants from '../constants';
import fetch from 'isomorphic-fetch'
export default function() {
	var api = Router();

	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	// mount the facets resource
	api.use('/facets', facets);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	api.post('/login', /*urlencodedParser,*/ (req, res) => {
		console.log(req);
		Parse.User.logIn(req.body.username, req.body.password, {
			success: (user) => {
				res.json(user);
			},
			error: (user, error) => {
				res.json({
					error: 'poop',
					errorMessage: error
				});
			}
		});
	});

	api.get('/user', (req, res) => {
		if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
		var token = req.query.sessionToken;
		var headers = {
			"X-Parse-Application-Id": constants.applicationId,
			"X-Parse-REST-API-Key": constants.restKey,
			"X-Parse-Session-Token": token
		}
		fetch('https://api.parse.com/1/users/me', {
			headers: headers
		}).then(response => response.json())
		.then((json) => {
			var query = new Parse.Query(Parse.User);
			query.get(json.objectId, {sessionToken: token,
				success: (user) => {
					res.json(user);
				},
				error: (error) => {
					res.json(error);
				}});
		});
	});



	api.get('/user/classes', (req, res) => {
		if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
		var token = req.query.sessionToken;
		getUser(token, (user) => {
			var userClasses = user.relation("classes");
			userClasses.query().find({
				success: (results) => {
					res.json(results);
				},
				error: (error) => {
					res.json(error);
				}
			})
		});
	});

	//api.get('/populate', (req, res) => {
	//	let classId = "vrIqsmWXnb";
	//	let sessionId = "swiH98RqEY";
	//	var classQuery = new Parse.Query("Class");
	//	classQuery.get(classId, {
	//		success: (currentClass) => {
	//			var sessionQuery = new Parse.Query("ClassSession");
	//			sessionQuery.get(sessionId, {
	//				success: (currentSession) => {
	//					var sessions = currentClass.relation("classSessions");
	//					sessions.add(currentSession);
	//					currentClass.save({
	//						success: (object) => {
	//							res.json(object);
	//						},
	//						error: (object, error) => {
	//							res.json(error);
	//						}
	//					});
	//				},
	//				error: (error) => {
	//					res.json(error);
	//				}
	//			});
	//		}, error: (error) => {
	//			res.json(error);
	//		}
	//	})
	//});

	api.get('/user/valid', (req, res) => {
		if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
		var token = req.query.sessionToken;
		var headers = {
			"X-Parse-Application-Id": constants.applicationId,
			"X-Parse-REST-API-Key": constants.restKey,
			"X-Parse-Session-Token": token
		}
		fetch('https://api.parse.com/1/users/me', {
			headers: headers
		}).then(response => response.json())
		.then(json => res.json(json));
	});

	//api.get('/user/classes', (req, res) => {
	//	if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
	//	var token = req.query.sessionToken;
	//	var query = new Parse.Query("Question");
	//	// query.equalTo("sessionToken", token);
	//	query.find({sessionToken: token,
	//		success: (results) => {
	//			console.log(results);
	//			res.json({
	//				token: {
	//					app: constants.applicationId,
	//					jKey: constants.javaScriptKey
	//				}, results});
	//		}, error: (error) => {
	//			res.json(error);
	//		}
	//	})
	//});

	api.get('/class/:id', (req, res) => {
        if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
        var token = req.query.sessionToken;
        var id = req.params.id;
        var query = new Parse.Query("Class");
        query.get(id, {sessionToken: token,
            success: (results) => {
                console.log(results);
                res.json(results);
            },
            error: (error) => {
                console.log(error);
                res.json(error);
            }
        });
    });

    api.get('/class/:id/sessions', (req, res) => {
        if(!req.query || req.query.sessionToken === null) { res.json({error: 'user not logged in', errorCode: 1001})}
        var token = req.query.sessionToken;
        var id = req.params.id;
        var query = new Parse.Query("Class");
        query.get(id, {sessionToken: token,
            success: (result) => {
                console.log(result);
                var classSessions = result.relation("classSessions");
				classSessions.query().find({
					success: (results) => {
						res.json(results);
					},
					error: (error) => {
						res.josn(error);
					}

				})
            },
            error: (error) => {
                console.log(error);
                res.json(error);
            }
        });
    });

	return api;
}

function getUser(token, callback) {
	var headers = {
		"X-Parse-Application-Id": constants.applicationId,
		"X-Parse-REST-API-Key": constants.restKey,
		"X-Parse-Session-Token": token
	}
	fetch('https://api.parse.com/1/users/me', {
		headers: headers
	}).then(response => response.json())
	.then((json) => {
		var query = new Parse.Query(Parse.User);
		query.get(json.objectId, {sessionToken: token,
			success: (user) => {
				callback(user);
			},
			error: (error) => {
				callback(error);
			}});
	});
}
