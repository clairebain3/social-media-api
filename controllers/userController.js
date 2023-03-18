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

createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $addToSet: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'Reaction created, but found no thought with that ID',
            })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
     User.create(req.body)
        .then((user) => {
            return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: user._id } },
          { new: true }
            );
  })
      
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