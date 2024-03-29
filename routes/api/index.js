const router = require('express').Router();
const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes')

router.use('/thoughts', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
