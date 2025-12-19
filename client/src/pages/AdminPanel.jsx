import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import ImageCropper from '../components/ImageCropper';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const fileInputRef = useRef(null);
  
  // Data States
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  
  // Form States
  const [projectData, setProjectData] = useState({ title: '', description: '', image: '' });
  const [clientData, setClientData] = useState({ name: '', designation: '', description: '', image: '' });

  // Cropper States
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImageField, setCurrentImageField] = useState(''); // To check if we are cropping for 'project' or 'client'

  // FETCH DATA
  useEffect(() => {
    if (activeTab === 'messages') fetchContacts();
    if (activeTab === 'subscribers') fetchSubscribers();
  }, [activeTab]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/contact');
      setContacts(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get('/subscribe');
      setSubscribers(res.data);
    } catch (err) { console.error(err); }
  };

  // IMAGE HANDLING
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setCurrentImageField(field);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedBase64) => {
    if (currentImageField === 'project') {
      setProjectData({ ...projectData, image: croppedBase64 });
    } else if (currentImageField === 'client') {
      setClientData({ ...clientData, image: croppedBase64 });
    }
    setShowCropper(false);
  };

  // --- SUBMIT HANDLERS ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/projects', projectData);
      alert('Project Added Successfully!');
      setProjectData({ title: '', description: '', image: '' });
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } catch (err) { alert('Error adding project'); }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/clients', clientData);
      alert('Client Added Successfully!');
      setClientData({ name: '', designation: '', description: '', image: '' });
    } catch (err) { alert('Error adding client'); }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  navigate('/login');

};

  return (
    <div className="admin-container">
      {/* Sidebar / Tabs */}
      <div className="sidebar">
        <h2>Apex Admin</h2>
        <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'active' : ''}>Projects</button>
        <button onClick={() => setActiveTab('clients')} className={activeTab === 'clients' ? 'active' : ''}>Clients</button>
        <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</button>
        <button onClick={() => setActiveTab('subscribers')} className={activeTab === 'subscribers' ? 'active' : ''}>Subscribers</button>
        <button onClick={handleLogout} style={{marginTop: 'auto', background: '#c0392b', color: 'white'}}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* TAB 1: ADD PROJECTS */}
        {activeTab === 'projects' && (
          <div className="form-section">
            <h3>Add New Project</h3>
            <form onSubmit={handleProjectSubmit}>
              <input type="text" placeholder="Project Name" value={projectData.title} onChange={(e) => setProjectData({...projectData, title: e.target.value})} required />
              <textarea placeholder="Description" value={projectData.description} onChange={(e) => setProjectData({...projectData, description: e.target.value})} required />
              
              <div className="file-input-wrapper">
                <label>Project Image (Will be cropped)</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'project')} />
              </div>
              {projectData.image && <img src={projectData.image} alt="Preview" className="preview-img" />}
              
              <button type="submit" className="save-btn">Save Project</button>
            </form>
          </div>
        )}

        {/* TAB 2: ADD CLIENTS */}
        {activeTab === 'clients' && (
          <div className="form-section">
            <h3>Add Happy Client</h3>
            <form onSubmit={handleClientSubmit}>
              <input type="text" placeholder="Client Name" value={clientData.name} onChange={(e) => setClientData({...clientData, name: e.target.value})} required />
              <input type="text" placeholder="Designation (e.g. CEO)" value={clientData.designation} onChange={(e) => setClientData({...clientData, designation: e.target.value})} required />
              <textarea placeholder="Testimonial" value={clientData.description} onChange={(e) => setClientData({...clientData, description: e.target.value})} required />
              
              <div className="file-input-wrapper">
                <label>Client Photo (Will be cropped)</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'client')} />
              </div>
              {clientData.image && <img src={clientData.image} alt="Preview" className="preview-img" />}
              
              <button type="submit" className="save-btn">Save Client</button>
            </form>
          </div>
        )}

        {/* TAB 3: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="data-list">
            <h3>Contact Form Submissions</h3>
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>City</th></tr></thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}><td>{c.fullName}</td><td>{c.email}</td><td>{c.mobileNumber}</td><td>{c.city}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="data-list">
            <h3>Newsletter Subscribers</h3>
            <ul>
              {subscribers.map((s) => <li key={s._id}>{s.email}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* CROPPER POPUP */}
      {showCropper && (
        <ImageCropper 
          imageSrc={imageSrc} 
          onCropComplete={onCropComplete} 
          onClose={() => setShowCropper(false)} 
        />
      )}
    </div>
  );
};

export default AdminPanel;