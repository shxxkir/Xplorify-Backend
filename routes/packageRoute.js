const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.post('/package', packageController.create);
router.get('/package', packageController.findAll);
router.put('/package/:id', packageController.update);
router.delete('/package/:id', packageController.delete);

module.exports = router;