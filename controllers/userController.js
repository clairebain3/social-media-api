const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
     // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

// get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

        // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
// add friend to user's friend list


  addFriend(req, res) {
User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }
            )
  
      
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'no user found',
            })
          : res.json('Created the friend 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteFriend(req, res) {
    User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: {friends:  { friends: req.params.friendId } }},
          { new: true }
        )
      
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'no user found',
            })
          : res.json('removed the friend 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json({ message: 'User successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
  },

  editUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json({ message: 'User successfully edited!' })
          )
          .catch((err) => res.status(500).json(err));
  },


}