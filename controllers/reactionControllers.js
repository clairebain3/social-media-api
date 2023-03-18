const { Reaction, User, Thought } = require('../models');

module.exports = {

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

      deleteReaction(req, res) {
        Reaction.findOneAndRemove({ _id: req.params.reactionId })
          .then((reaction) =>
            !reaction
              ? res.status(404).json({ message: 'No reaction with this id!' })
              : Thought.findOneAndUpdate(
                  { reactions: req.params.reactionId },
                  { $pull: { reaction: req.params.reactionId } },
                  { new: true }
                )
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