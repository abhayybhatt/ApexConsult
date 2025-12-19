const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');

// Submit Contact Form (Landing Page)
exports.submitContact = async (req, res) => {
    const contactData = req.body;
    const newContact = new Contact(contactData);
    try {
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get All Contacts (Admin Panel)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 }); // Newest first
        res.status(200).json(contacts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Subscribe (Landing Page)
exports.subscribe = async (req, res) => {
    const { email } = req.body;
    try {
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) return res.status(400).json({ message: "Email already subscribed" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get Subscribers (Admin Panel)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};