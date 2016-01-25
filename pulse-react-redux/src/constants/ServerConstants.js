// Use DefinePlugin (Webpack) or loose-envify (Browserify)
// together with Uglify to strip the dev branch in prod build.
var host;
if (process.env.NODE_ENV === 'production') {
  host = "";
  //module.exports = require('./ServerConstants.prod');
} else {
  host = "http://localhost:8080/api";
  //module.exports = require('./ServerConstants.dev');
}

export const login = host + "/login";
export const getClasses = host + "/user/classes";
export const getClassSessions = (classId) => {
  return host + "/class/"+classId+"/sessions"
};
