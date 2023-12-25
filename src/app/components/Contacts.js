import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Button from './Button'

// Styled component named StyledContainer
const StyledContainer = styled.div`
  background-color: rgb(var(--clr-subtle-gray));
  color: rgb(var(--clr-gray));
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2{
    font-size: 3rem;
  }

  h1,
  h2,
  h3 {
    color: rgb(var(--clr-gold));
  }

  p {
    line-height: 1.6;
    padding: 0.75em;
  }

  strong {
    text-transform: uppercase;
    color: rgb(var(--clr-gold));
  }

`;

const StyledContactsContainer = styled.div`
width: 70%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const StyledForm = styled.form`
    display: grid;
    width: 100%; 
    max-width: 600px; 
    margin: 20px 10px;
    grid-gap: 10px;
    


    @media (min-width: 600px) { // Adjust breakpoint as needed
      grid-template-columns: 1fr 1fr; // Two columns on large screens
      grid-template-areas: 
        "name email"
        "message message"
        "button button";
    }
  
    // For small screens
    @media (max-width: 599px) {
      grid-template-columns: 1fr; // One column on small screens
      grid-template-areas: 
        "name"
        "email"
        "message"
        "button";
    }
`;



// Styled component for input
const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 5px;
  border: 2px solid rgb(var(--clr-gold));
  border-radius: 10px;
  grid-area: name;
  width: calc(100% - 10px);
  background-color: inherit;
  font-family: var(--font);
  color: rgb(var(--clr-gray));
  

  &:last-of-type {
    grid-area: email; 
  }

  &:focus {
    outline:  2px solid rgb(var(--clr-pink)); 
  }
`;


const StyledTextArea = styled.textarea`
  padding: 10px;
  margin: 10px 5px;
  border: 2px solid rgb(var(--clr-gold));
  border-radius: 10px;
  height: 100px; // Larger height for the textarea
  width: calc(100% - 10px); // Ensure it occupies the full width
  resize: vertical; 
  grid-area: message;
  background-color: inherit;
  font-family: var(--font);
  color: rgb(var(--clr-gray));

  &:focus {
    outline:  2px solid rgb(var(--clr-pink)); 
  }
`;

const GridButton = styled(Button)`
  grid-area: button;
  justify-self: center;
  padding: .5em 1em;
`;


const ContactList = styled.ul`
  list-style: none; // Removes bullets
  padding: 0;

  li {
    display: flex;
    align-items: center; // Aligns icons with text
    margin-bottom: 10px; // Adds space between items
  }

  a {
    text-decoration: none;
    color: inherit; // Keeps link color consistent
    margin-left: 5px; // Spacing between icon and text
  }

  .icon {
    // Styles for your icon (Font Awesome, SVG, etc.)
    margin-right: 10px; // Space between icon and text
  }
`;

const Contact = ({ id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the form state before validation
    console.log('Form state before validation:', { name, email, message });

    // Basic validation (optional)
    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    // Log the form data after validation
    console.log('Form data after validation:', { name, email, message });

    // Form data
    const formData = {
      name,
      email,
      message
    };

    // Log the formData object before sending
    console.log('Sending formData to server:', formData);

    // Sending data to the server
    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Log the raw response from the server
      console.log('Raw response from server:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Log the parsed response data
      console.log('Parsed response data:', result);

      alert("Message sent successfully!");

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error during fetch request:', error);
      alert('Error sending message: ' + error.message);
    }
  }



  return (
    <StyledContainer id={id}>
      <StyledContactsContainer>
        <h2>Contact Me</h2>
        <p><strong>For Small Businesses & Individual Entrepreneurs: </strong>Need a website that captures the essence of your business? I specialize in creating custom, engaging websites that help small businesses and entrepreneurs stand out and grow.</p>
        <p><strong>For Startups & Innovative Projects: </strong>As a passionate web developer, I love working with startups and innovative projects. If you're looking for a tech partner to bring your vision to life, you're in the right place.</p>
        <p><strong>For Networking & Partnerships: </strong>I'm always excited to connect with other professionals. Whether you're a freelancer, a company looking for a freelance developer, or someone who wants to discuss a potential partnership, let's talk!</p>
        <p><strong>Reach Out Now: </strong>I'm just an email or message away. Contact me for any web development needs, questions, or just to say hi. Together, we can create a website that not only meets but exceeds your expectations.</p>
        <p>Feel free to reach out to me via email <a href="mailto:annapro.webdev@gmail.com">annapro.webdev@gmail.com</a> or use a contact form</p>
      </StyledContactsContainer>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        <StyledTextArea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
        />
        <GridButton type="submit" onClick={handleSubmit} aria-label="send message">Send message</GridButton>
      </StyledForm>
      <StyledContactsContainer>

      </StyledContactsContainer>
    </StyledContainer>
  );
};

export default Contact;