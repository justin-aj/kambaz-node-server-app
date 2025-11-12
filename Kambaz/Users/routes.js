import UsersDao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app, db) {
 const dao = UsersDao(db);
  const createUser = (req, res) => {
    const user = req.body;
    const newUser = dao.createUser(user);
    res.json(newUser);
  };

  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.json({ status: "ok" });
  };

  const findAllUsers = (req, res) => {
    const { role, courseId } = req.query;
    
    // If courseId is provided, find users enrolled in that course
    if (courseId) {
      const { enrollments, users } = db;
      const enrolledUsers = users.filter((user) =>
        enrollments.some((enrollment) => enrollment.user === user._id && enrollment.course === courseId)
      );
      res.json(enrolledUsers);
      return;
    }
    
    // If role is provided, filter by role
    if (role) {
      const users = dao.findAllUsers();
      const filteredUsers = users.filter((user) => user.role === role);
      res.json(filteredUsers);
      return;
    }
    
    // Otherwise return all users
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };
  const updateUser = (req, res) => { 
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

  };
  const signup = (req, res) => { 
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
