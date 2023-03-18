const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

  // /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends').post(addFriend).delete(deleteFriend)

module.exports = router;