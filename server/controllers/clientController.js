const Client = require('../models/Client');

// Get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a client
exports.createClient = async (req, res) => {
    const client = req.body;
    const newClient = new Client(client);
    try {
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete client
exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await Client.findByIdAndDelete(id);
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};