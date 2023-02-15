const router = require('express').Router();
const { userDataValidator } = require('../middlewares/validation');
const {
  getUser, updateUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', userDataValidator, updateUser);

module.exports = router;
