export const login = "http://localhost:8080/api/login";
export const getClasses = "http://localhost:8080/api/user/classes";
export const getClassSessions = (classId) => {
  return "http://localhost:8080/api/class/"+classId+"/sessions"
}
