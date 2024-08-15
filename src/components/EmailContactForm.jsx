import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Component for a contact form using React and EmailJS
const EmailContactForm = () => {
    // State hooks to manage form input values
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    // Event handler for form submission
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Retrieve EmailJS credentials from environment variables
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const userId = process.env.REACT_APP_EMAILJS_USER_ID;

        // Prepare the template parameters for the email
        const templateParams = {
            from_name: contactName, // Name of the person submitting the form
            from_email: contactEmail, // Email of the person submitting the form
            to_name: "React Form", // Receiver name (can be changed as needed)
            message: contactMessage // Message content from the form
        };

        // Send the email using EmailJS
        emailjs
            .send(serviceId, templateId, templateParams, userId)
            .then(
                () => {
                    console.log('SUCCESS!'); // Log success message
                },
                (error) => {
                    console.log('FAILED...', error); // Log error message
                },
            );
    }

    return (
        // Form with input fields and submit button
        <form onSubmit={handleFormSubmit} className='emailForm'>
            {/* Name input field */}
            <input type="text"
                placeholder='Your Name'
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />
            {/* Email input field */}
            <input type="email"
                placeholder='Your Email'
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
            />
            {/* Message textarea */}
            <textarea
                cols={30}
                rows={10}
                placeholder='Your Message'
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
            ></textarea>
            {/* Submit button */}
            <button type='submit'>Send Email</button>
        </form>
    );
}

export default EmailContactForm;
