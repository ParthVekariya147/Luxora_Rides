import React, { useState } from 'react';

const Contact = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    });
    // State to display a custom message after form submission
    const [submitMessage, setSubmitMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    // Update state when input values change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage(null); // Clear previous messages

        try {
            // Simulate API call
            // In a real application, you would send form data to your backend here
            // Example: const response = await fetch('/api/send-message', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            // const result = await response.json();

            // For demonstration, we'll just simulate success after a short delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Assuming success
            setSubmitMessage('Your message has been sent successfully!');
            setMessageType('success');
            setFormData({ email: '', name: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error submitting form:', error); // Log error to console
            setSubmitMessage('Failed to send message. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Main Contact Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden relative z-10">
                {/* Left Section: Illustration and Contact Info */}
                <div className="lg:w-1/2 p-10 bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-extrabold mb-4">CONTACT US</h2>
                    <p className="text-lg mb-6 opacity-80">Or reach out manually to</p>
                    <a href="Home.jsx" className="text-xl font-medium text-purple-200 hover:underline mb-8">
                         luxora.rides@gmail.com
                    </a>
                    {/* Paper plane illustration */}
                    <div className="relative w-full flex justify-center mt-6">
                        <svg className="w-48 h-48 text-purple-300 animate-float" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.42 2.58a2 2 0 00-2.3-2.3l-16 6a2 2 0 000 3.82l6 2.3 2.3 6a2 2 0 003.82 0l6-16z"></path>
                        </svg>
                        {/* Clouds */}
                        <div className="absolute bottom-12 -left-4 w-20 h-10 bg-white rounded-full opacity-60 blur-md custom-cloud-animate-1"></div>
                        <div className="absolute top-8 -right-8 w-24 h-12 bg-white rounded-full opacity-60 blur-md custom-cloud-animate-2"></div>
                        <div className="absolute -bottom-8 right-16 w-16 h-8 bg-white rounded-full opacity-60 blur-md custom-cloud-animate-3"></div>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="lg:w-1/2 p-10 bg-white flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                            <p className="mt-1 text-xs text-gray-500">We'll never share your email with anyone else.</p>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Your name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Your message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Type your message here..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-y"
                            ></textarea>
                        </div>

                        {submitMessage && (
                            <div className={`p-3 rounded-lg text-sm ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {submitMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;