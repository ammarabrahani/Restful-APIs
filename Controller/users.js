import Users from "../Models/users.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server");
  }
};
