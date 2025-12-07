import { useState } from 'react';
import API from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/contact', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-aura-dark mb-4">Get in Touch</h1>
                    <p className="text-aura-lightText">Have a question or just want to say hello? We'd love to hear from you.</p>
                </div>

                {submitted ? (
                    <div className="bg-aura-pink/10 text-aura-pink p-6 text-center border border-aura-pink rounded-xl">
                        <h3 className="font-serif text-xl mb-2">Thank you!</h3>
                        <p>Your message has been received. We'll respond shortly.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-4 underline text-sm">Send another message</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="bg-red-50 text-red-500 p-3 text-sm">{error}</div>}
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-aura-text mb-2">Name</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-aura-text mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="input-field"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-aura-text mb-2">Message</label>
                            <textarea
                                required
                                rows="5"
                                className="input-field"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full">Send Message</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
