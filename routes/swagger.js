var express = require('express');
var router = express.Router();

/* GET swagger page. */
router.get('/', function(req, res, next) {
	res.render('swagger');
});

module.exports = router;
