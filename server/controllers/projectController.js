const Project = require('../models/Project');

// Get all projects (For Landing Page)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a project (For Admin Panel)
exports.createProject = async (req, res) => {
    const project = req.body;
    const newProject = new Project(project);
    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete project (Extra feature for Admin)
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};