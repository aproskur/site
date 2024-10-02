'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from './Button';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const Contact = ({ id }) => {
  const [loadRecaptcha, setLoadRecaptcha] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleFocus = () => {
    if (!loadRecaptcha) {
      setLoadRecaptcha(true); // Load reCAPTCHA only when form is focused
    }
  };

  return (
    <>
      {loadRecaptcha ? (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
          <ContactForm id={id} />
        </GoogleReCaptchaProvider>
      ) : (
        // Trigger reCAPTCHA load on form interaction
        <ContactForm id={id} onFocus={handleFocus} />
      )}
    </>
  );
};




const StyledContainer = styled.div`
  background-color: rgb(var(--clr-subtle-gray));
  color: rgb(var(--clr-gray));
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 3rem;

    @media (max-width: 500px) {
      font-size: 2.5rem;
    }
  }

  h1,
  h2,
  h3 {
    color: rgb(var(--clr-gold));
  }

  p {
    line-height: 1.6;
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
  margin-top: 1em;

  @media (max-width: 800px) {
    width: 90%;
  }

  div {
    padding: 1em 1em;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: .75em;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const StyledErrorMessage = styled.span`
  font-size: 0.8rem;
  margin: ${({ $show }) => ($show ? '5px 0' : '0')};
  height: ${({ $show }) => ($show ? 'auto' : '0')};
  overflow: hidden;
  margin: 0px 15px;
`;

const StyledForm = styled.form`
font-family: var(--font-poppins);
  display: grid;
  width: 100%; 
  max-width: 600px;
  padding: 10px;
  margin: 20px 10px;
  grid-template-areas: 
    "name"
    "email"
    "message"
    "button";

  @media (min-width: 600px) { 
    grid-template-columns: 1fr 1fr; 
    grid-template-areas: 
      "name email"
      "message message"
      "button button";
  }
`;

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
    outline: 2px solid rgb(var(--clr-pink)); 
  }
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  margin: 10px 5px;
  border: 2px solid rgb(var(--clr-gold));
  border-radius: 10px;
  height: 100px;
  width: calc(100% - 10px);
  resize: vertical; 
  grid-area: message;
  background-color: inherit;
  font-family: var(--font);
  color: rgb(var(--clr-gray));

  &:focus {
    outline: 2px solid rgb(var(--clr-pink)); 
  }
`;

const GridButton = styled(Button)`
  grid-area: button;
  justify-self: center;
  padding: .5em 1em;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center; 
    margin-bottom: 10px; 
  }

  a {
    text-decoration: none;
    color: inherit; 
    margin-left: 5px;
  }

  .icon {
    margin-right: 10px; 
  }
`;

const StyledParagraph = styled.p`
  font-size: .8rem;
  margin-bottom: 18px;

  a {
    color: rgb(var(--clr-gold));
  }
`;

const StyledMessage = styled.div`
  display: flex;
  padding: 5px;
  text-transform: uppercase;
  font-size: 0.75rem;
`;

const StyledSuccessFormMessage = styled(StyledMessage)`
  p {
    color: rgb(var(--clr-gray));
    border: 1px solid rgb(var(--clr-gold));
  }
`;

const StyledErrorFormMessage = styled(StyledMessage)`
  p {
    color: red;
    border: 1px solid rgb(var(--clr-gold));
  }
`;

const ContactForm = ({ onFocus }) => {


  const { executeRecaptcha } = useGoogleReCaptcha();

  // Define recaptchaReady state
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure recaptcha is loaded before enabling the submit button
  useEffect(() => {
    if (executeRecaptcha) {
      setRecaptchaReady(true); // reCAPTCHA is available
    }
  }, [executeRecaptcha]);



  const validateForm = (token, name, email, message) => {
    let isValid = true;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || email.trim() === '') {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!message || message.trim() === '') {
      setMessageError("Please enter your message");
      isValid = false;
    } else {
      setMessageError("");
    }

    if (!token) {
      setErrorMessage("Please complete the reCAPTCHA");
      isValid = false;
    } else {
      setErrorMessage(""); // Clear error message if token is present
    }

    return isValid;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure reCAPTCHA is available before submission
    if (!recaptchaReady) {
      setErrorMessage("reCAPTCHA not yet loaded. Please try again in a moment.");
      return;
    }

    // Call reCAPTCHA only if executeRecaptcha is available
    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("form_submit");

    // Pass token to validateForm if needed
    const isValid = validateForm(token, name, email, message);

    if (!isValid) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/send-email', {
        token,
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccessMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Failed to send message. Please try again later.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setErrorMessage(`Failed to send message: ${error.response.data.error}`);
      } else {
        console.error('Error message:', error.message);
        setErrorMessage('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <StyledContainer>
      <StyledContactsContainer>
        <h2>Contact Me</h2>
        <p><strong>For Small Businesses & Individual Entrepreneurs: </strong>Need a website that captures the essence of your business? I specialize in creating custom, engaging websites that help small businesses and entrepreneurs stand out and grow.</p>
        <p><strong>For Startups & Innovative Projects: </strong>As a passionate web developer, I love working with startups and innovative projects. If you're looking for a tech partner to bring your vision to life, you're in the right place.</p>
        <p><strong>For Networking & Partnerships: </strong>I'm always excited to connect with other professionals. Whether you're a freelancer, a company looking for a freelance developer, or someone who wants to discuss a potential partnership, let's talk!</p>
        <p><strong>Reach Out Now: </strong>I'm just an email or message away. Contact me for any web development needs, questions, or just to say hi. Together, we can create a website that not only meets but exceeds your expectations.</p>
        <p>Feel free to reach out to me via email <a style={{ color: 'rgb(var(--clr-gold))' }} href="mailto:annapro.webdev@gmail.com">annapro.webdev@gmail.com</a>
          &nbsp; or use a contact form below</p>
      </StyledContactsContainer>

      <StyledForm onSubmit={handleSubmit}>
        <FieldWrapper style={{ gridArea: 'name' }}>
          <StyledInput
            type="text"
            value={name}
            aria-label="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!nameError}>{nameError}</StyledErrorMessage>
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'email' }}>
          <StyledInput
            type="email"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!emailError}>{emailError}</StyledErrorMessage>
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'message' }}>
          <StyledTextArea
            type="text"
            aria-label="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!messageError}>{messageError}</StyledErrorMessage>
        </FieldWrapper>
        <GridButton style={{ gridArea: 'button' }} type="submit" aria-label="send message">
          {isSubmitting ? "Sending message..." : "Send message"}
        </GridButton>

      </StyledForm>
      {
        successMessage && (
          <StyledSuccessFormMessage>
            <p>{successMessage}</p>
          </StyledSuccessFormMessage>
        )
      }

      {
        errorMessage && (
          <StyledErrorFormMessage>
            <p>{errorMessage}</p>
          </StyledErrorFormMessage>
        )
      }

      <StyledParagraph>This site is protected by reCAPTCHA and the
        <a href="https://policies.google.com/privacy"> Google Privacy Policy</a> and
        <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
      </StyledParagraph>
    </StyledContainer >
  );
};

export default Contact;