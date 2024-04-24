const express = require('express');

const personController = require('../controllers/person');

const router = express.Router();

router.post('/person/add', personController.postPerson);

// GET route to display the form
router.get('/person/add', personController.addPerson);

router.get('/person/get-persons', personController.getPersons);

module.exports = router;
