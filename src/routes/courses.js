const express = require('express');
const router = express.Router();
const { courseValidation } = require('../middlewares/validate');
const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', courseValidation, coursesController.store);
router.get('/:slug', coursesController.show);

module.exports = router;
