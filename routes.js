const router = require('express').Router();

const checkToken = require('./middleware/checkToken');
const checkPermissions = require('./middleware/checkPermissions');
const auth = require('./controller/auth');
const users = require('./controller/auth');

//auth
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/logout', auth.logout);

//users
router.route('/api/users/:id').all(checkToken, checkPermissions)
    .delete(users._delete)
    .update(users._update);

module.exports = router;