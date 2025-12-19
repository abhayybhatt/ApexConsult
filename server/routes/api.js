const express = require('express');
const router = express.Router();

const { getProjects, createProject, deleteProject } = require('../controllers/projectController');
const { getClients, createClient, deleteClient } = require('../controllers/clientController');
const { submitContact, getContacts, subscribe, getSubscribers } = require('../controllers/formController');

// Project Routes
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.delete('/projects/:id', deleteProject);

// Client Routes
router.get('/clients', getClients);
router.post('/clients', createClient);
router.delete('/clients/:id', deleteClient);

// Form Routes
router.post('/contact', submitContact);
router.get('/contact', getContacts);

// Newsletter Routes
router.post('/subscribe', subscribe);
router.get('/subscribe', getSubscribers);

module.exports = router;