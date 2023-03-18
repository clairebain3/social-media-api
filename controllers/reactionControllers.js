const { User, Thought } = require('../models');

module.exports = {

    createReaction(req, res) {
    Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { new: true }
            )
          
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'Reaction created, but found no thought with that ID',
                })
              : res.json('Created the reaction 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
                  { _id: req.params.thoughtId },
                  { $pull: { reaction: req.params.reactionId } },
                  { new: true }
                )
          
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'Reaction deleted but no thought with this id!',
                })
              : res.json({ message: 'Reaction successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },


}