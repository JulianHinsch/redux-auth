const router = require('express').Router();

const checkToken = require('./middleware/checkToken');
const checkPermissions = require('./middleware/checkPermissions');
const auth = require('./controller/auth');
const books = require('./controller/books');

//auth
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/logout', auth.logout);

//books (just an example!)
router.route('/api/books/:id').all(checkToken, checkPermissions)
    .post(books._create)
    .get(books._get)
    .delete(books._delete)
    .patch(books._update);

module.exports = router;