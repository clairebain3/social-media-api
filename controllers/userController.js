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
    const friend = User.create(req.body)
        .then((friend) => {
            return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: friend._id } },
          { new: true }
            );
  })
      
      .then((friend) =>
        !friend
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
          { _id: req.body.userId },
          { $pull: {friends:  { friends: friend._id } }},
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


}