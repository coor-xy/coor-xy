const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/charts', require('./charts'));
router.use('/data', require('./data'));
router.use('/share', require('./shareChart'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

