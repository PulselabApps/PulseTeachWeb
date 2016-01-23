import Parse from 'parse/node';
import * as constants from './constants';

export default function(callback) {
	// connect to a database if needed
	Parse.initialize(constants.applicationId, constants.javaScriptKey);
	callback();
}
