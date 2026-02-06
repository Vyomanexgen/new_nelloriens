import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import { resetContactForm, submitContactForm } from "../../state/slices/contactSlice";
import "./ContactUs.css";

const ContactUs = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    // Local state for form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // Handle Redux state safely (fallback if slice not registered)
    const { loading, success, error } = useSelector((state) => state.contact || { 
        loading: false, 
        success: false, 
        error: null 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitContactForm(formData));
    };

    // Reset form on success after a delay
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(resetContactForm());
                setFormData({ name: "", email: "", subject: "", message: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    return (
        <div className="contact-page">
            <TopHeader />
            <MainHeader 
                siteName="NELLORIENS" 
                tagline="Connecting You with Nellore"
            />
            <Navbar includeSearch={false} />

            <main className="contact-main">
                <div className="contact-container">
                    
                    <div className="contact-header">
                        <h1 className="contact-title">{t("Contact Us") || "Contact Us"}</h1>
                        <p className="contact-subtitle">
                          Have questions or suggestions? We'd love to hear from you. 
                          Reach out to us using the form below or via our contact details.
                        </p>
                    </div>

                    <div className="contact-content-wrapper">
                        {/* Contact Info Card */}
                        <div className="contact-info-card">
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="info-details">
                                    <h4>Our Location</h4>
                                    <p>Nellore, Andhra Pradesh, India</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="info-details">
                                    <h4>Email Us</h4>
                                    <p>contact@nelloriens.in</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaPhone />
                                </div>
                                <div className="info-details">
                                    <h4>Call Us</h4>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>

                             {/* Simple Map Placeholder/Image or iframe could go here */}
                             <div style={{ marginTop: '2rem', borderRadius: '15px', overflow: 'hidden', height: '200px', background: '#e9ecef' }}>
                                <iframe 
                                    title="Nellore Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61776.54922240974!2d79.9573983296836!3d14.449371900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c8cca0e958771%3A0xd3036c2025161f55!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1709282342834!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                             </div>
                        </div>

                        {/* Contact Form Card */}
                        <div className="contact-form-card">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        className="form-input"
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        placeholder="Enter your name" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="form-input"
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="Enter your email" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="subject">Subject</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        className="form-input"
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        placeholder="What is this regarding?" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        className="form-textarea"
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        placeholder="Type your message here..." 
                                        required 
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="submit-btn" 
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : (
                                        <>
                                            Send Message <FaPaperPlane />
                                        </>
                                    )}
                                </button>

                                {success && (
                                    <div className="form-message success">
                                        Message sent successfully! We will get back to you soon.
                                    </div>
                                )}
                                
                                {error && (
                                    <div className="form-message error">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer 
                siteName="NELLORIENS" 
                tagline="Your trusted gateway to explore Nellore."
            />
        </div>
    );
};

export default ContactUs;
