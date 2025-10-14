'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from './Button';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useTranslations, useLocale } from 'next-intl';

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

      @media (max-width: 600px){

        h2 {
        font-size: 1.75rem !important;
        }
    }


  p {
    line-height: 1.6;
    padding-bottom: 0.5em;
  }

  strong {
    text-transform: uppercase;
    color: rgb(var(--clr-gold));
  }

  div:last-child{
  text-align: center;}
`;

const StyledContactsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
    font-family: ${(props) =>
    props.$locale === 'ru' ? 'Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};

  @media (max-width: 800px) {
    width: 90%;
  }

  div {
    padding: 1em 1em;
  }

  h2 {
   
    margin-bottom: .75em;
    font-size: ${(props) =>
    props.$locale === 'ru' ? '2.5rem' : '3rem'};
  }
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
       font-family: ${(props) =>
    props.$locale === 'ru' ? 'Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};

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
  padding: 1em 1em;

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
  const t = useTranslations("Homepage.contacts");
  const locale = useLocale();
  const langParam = locale === 'ru' ? 'ru' : 'en';

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
      setNameError(t("enter-name-error"));
      isValid = false;
    } else {
      setNameError("");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || email.trim() === '') {
      setEmailError(t('enter-mail-error'));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t('valid-mail-error'));
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!message || message.trim() === '') {
      setMessageError(t('enter-message-error'));
      isValid = false;
    } else {
      setMessageError("");
    }

    if (!token) {
      setErrorMessage(t('complete-recaptcha-error'));
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
      setErrorMessage(t('recaptcha-load-error'));
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
      setErrorMessage(t('complete-all-fields-error'));
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
        setSuccessMessage(t('success-message'));
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage(t('failed-to-send-message'));
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setErrorMessage(`Failed to send message: ${error.response.data.error}`);
      } else {
        console.error('Error message:', error.message);
        setErrorMessage(t('failed-to-send-message'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <StyledContainer>
      <StyledContactsContainer $locale={locale}>
        <h2>{t('main-heading')}</h2>
        <p><strong>{t('caption-1')} </strong>{t('description-1')}</p>
        <p><strong>{t('caption-2')}</strong>{t('description-2')}</p>
        <p><strong>{t('caption-3')}</strong>{t('description-3')}</p>
        <p id="contact-anna"><strong>{t('caption-4')}</strong>{t('description-4')}</p>
        <p>{t('p1')}{' '}<a style={{ color: 'rgb(var(--clr-gold))' }} href="mailto:annapro.webdev@gmail.com">annapro.webdev@gmail.com</a>
          &nbsp; {t('p2')}</p>
      </StyledContactsContainer>

      <StyledForm onSubmit={handleSubmit}>
        <FieldWrapper style={{ gridArea: 'name' }}>
          <StyledInput
            id="name"
            type="text"
            value={name}
            aria-label="name"
            onChange={(e) => setName(e.target.value)}
            placeholder={t('name-placeholder')}
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!nameError}>{nameError}</StyledErrorMessage>
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'email' }}>
          <StyledInput
            id="email"
            type="email"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('mail-placeholder')}
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!emailError}>{emailError}</StyledErrorMessage>
        </FieldWrapper>
        <FieldWrapper style={{ gridArea: 'message' }}>
          <StyledTextArea
            id="text"
            type="text"
            aria-label="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('message-placeholder')}
            onFocus={onFocus}
          />
          <StyledErrorMessage $show={!!messageError}>{messageError}</StyledErrorMessage>
        </FieldWrapper>
        <GridButton $locale={locale} style={{ gridArea: 'button' }} type="submit" aria-label="send message">
          {isSubmitting ? t('sending-message') : t('send-message')}
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
      <div>
        <StyledParagraph>
          {t('recaptcha-message')}{' '}
          <a href={`https://policies.google.com/privacy?hl=${langParam}`}>
            {t('privacy-policy')}
          </a>{' '}
          {t('and')}{' '}
          <a href={`https://policies.google.com/terms?hl=${langParam}`}>
            {t('terms-of-service')}
          </a>{' '}
          {t('apply')}.
        </StyledParagraph>
      </div>

    </StyledContainer >
  );
};

export default Contact;
