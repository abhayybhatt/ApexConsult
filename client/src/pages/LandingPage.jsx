import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './LandingPage.css';

const LandingPage = () => {
  // Data States
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  
  // Form States
  const [contactForm, setContactForm] = useState({ fullName: '', email: '', mobileNumber: '', city: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // FETCH DATA ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await axios.get('/projects');
        setProjects(pRes.data);
        
        const cRes = await axios.get('/clients');
        setClients(cRes.data);
      } catch (err) { console.error("Error fetching data:", err); }
    };
    fetchData();
  }, []);

  // HANDLERS
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', contactForm);
      alert('Thank you! We will contact you soon.');
      setContactForm({ fullName: '', email: '', mobileNumber: '', city: '' });
    } catch (err) { alert('Something went wrong.'); }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/subscribe', { email: newsletterEmail });
      alert('Subscribed successfully!');
      setNewsletterEmail('');
    } catch (err) { alert(err.response?.data?.message || 'Error subscribing'); }
  };

  return (
    <div className="landing-container">
      {/* 1. HERO SECTION */}
      <header className="hero-section">
        <nav className="navbar">
            <div className="logo">ApexConsult</div>
            <div className="nav-links">
                <a href="#projects">Projects</a>
                <a href="#clients">Testimonials</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
        <div className="hero-content">
            <h1>Consulting, Design <br/> & Marketing</h1>
            <p>We help businesses grow with data-driven strategies and creative design.</p>
            <button className="cta-btn" onClick={() => document.getElementById('contact').scrollIntoView()}>Get a Free Quote</button>
        </div>
      </header>

      {/* 2. OUR PROJECTS SECTION */}
      <section id="projects" className="section-padding">
        <h2 className="section-title">Our Projects</h2>
        <div className="projects-grid">
            {projects.map((project) => (
                <div key={project._id} className="project-card">
                    <img src={project.image} alt={project.title} />
                    <div className="card-body">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <button className="read-more-btn">READ MORE</button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 3. HAPPY CLIENTS SECTION */}
      <section id="clients" className="section-padding bg-light">
        <h2 className="section-title">Happy Clients</h2>
        <div className="clients-grid">
            {clients.map((client) => (
                <div key={client._id} className="client-card">
                    <img src={client.image} alt={client.name} />
                    <p className="testimonial">"{client.description}"</p>
                    <h4>{client.name}</h4>
                    <span className="designation">{client.designation}</span>
                </div>
            ))}
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="section-padding contact-section">
        <div className="contact-container">
            <div className="contact-text">
                <h2>Get a Free Consultation</h2>
                <p>Ready to start your project? Fill out the form and we'll get back to you immediately.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
                <input type="text" placeholder="Full Name" value={contactForm.fullName} onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})} required />
                <input type="email" placeholder="Email Address" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required />
                <input type="tel" placeholder="Mobile Number" value={contactForm.mobileNumber} onChange={(e) => setContactForm({...contactForm, mobileNumber: e.target.value})} required />
                <input type="text" placeholder="City" value={contactForm.city} onChange={(e) => setContactForm({...contactForm, city: e.target.value})} required />
                <button type="submit" className="submit-btn">Get Quick Quote</button>
            </form>
        </div>
      </section>

      {/* 5. NEWSLETTER / FOOTER */}
      <footer className="footer">
        <div className="newsletter-wrapper">
            <h3>Subscribe to our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
                <input type="email" placeholder="Enter your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
                <button type="submit">Subscribe</button>
            </form>
        </div>
        <div className="copyright">
            © 2025 ApexConsult. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;