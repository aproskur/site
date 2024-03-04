import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Button from './Button'
import ReCAPTCHA from "react-google-recaptcha";

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

@media (max-width: 800px) {
  width: 90%;
}

div {
  padding: 1em 1em;
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
  overflow: hidden; // Ensures content does not spill out when height is 0
  margin: 0px 15px;
`;

const StyledForm = styled.form`
    display: grid;
    width: 100%; 
    max-width: 600px; 
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
font-size: 10px;

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

const Contact = ({ id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  //State for error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  // State for tracking form submission status. Added to avoid multiple submissions
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name) {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    if (!email) {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate message
    if (!message.trim()) {
      setMessageError("Please enter your message");
      isValid = false;
    } else {
      setMessageError("");
    }
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid || isSubmitting) {
      return;
    }

    // Form data
    const formData = {
      name,
      email,
      message
    };
    setIsSubmitting(true);

    // Sending data to the server
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });



      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();


      //TODO
      setSuccessMessage("Message sent successfully!");

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error during fetch request:', error);
      setErrorMessage('Error sending message: ' + error.message);
    } finally {
      setIsSubmitting(false); // Reset submission status

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);

    }
  }


  //TODO!!!
  const handleRecaptcha = (value) => {
    console.log("Captcha value:", value);
  };

  //tmp 
  console.lof('DEBUG env')
  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  return (
    <StyledContainer id={id}>
      <StyledContactsContainer>
        <h2>Contact Me</h2>
        <p><strong>For Small Businesses & Individual Entrepreneurs: </strong>Need a website that captures the essence of your business? I specialize in creating custom, engaging websites that help small businesses and entrepreneurs stand out and grow.</p>
        <p><strong>For Startups  Innovative Projects: </strong>As a passionate web developer, I love working with startups and innovative projects. If you're looking for a tech partner to bring your vision to life, you're in the right place.</p>
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <StyledErrorMessage $show={!!nameError}>{nameError}</StyledErrorMessage>
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'email' }}>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
          {<StyledErrorMessage $show={!!emailError}>{emailError}</StyledErrorMessage>}
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'message' }}>
          <StyledTextArea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
          />
          <StyledErrorMessage $show={!!messageError}>{messageError}</StyledErrorMessage>
        </FieldWrapper>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          size="invisible"
          onChange={handleRecaptcha}
        />
        <GridButton style={{ gridArea: 'button' }} type="submit" onClick={handleSubmit} aria-label="send message"> {isSubmitting ? "Sending message..." : "Send message"}</GridButton>
      </StyledForm>
      {successMessage && (
        <StyledSuccessFormMessage>
          <p>{successMessage}</p>
        </StyledSuccessFormMessage>
      )}

      {errorMessage && (
        <StyledErrorFormMessage>
          <p>{errorMessage}</p>
        </StyledErrorFormMessage>
      )}


      <StyledParagraph>This site is protected by reCAPTCHA and the
        <a href="https://policies.google.com/privacy"> Google Privacy Policy</a> and
        <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
      </StyledParagraph>
    </StyledContainer>
  );
};

export default Contact;