import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate, useLocation } from 'react-router-dom';

import './ContactForm.css';

function ContactForm() {
  const [state, handleSubmit] = useForm('mblrvgbl');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  useEffect(() => {
    const loadValues = () => {
      const savedEmail = localStorage.getItem('email');
      const savedMessage = localStorage.getItem('message');

      if (savedEmail) setEmail(savedEmail);
      if (savedMessage) setMessage(savedMessage);
    };

    loadValues();
  }, []);

  useEffect(() => {
    if (location.state?.userMessage) {
      setMessage('It generated this one for me: \n\n' + location.state.userMessage);
    }
  }, [location.state?.userMessage]);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);

    // Remove focus and fade out
    document.getElementById('contact-modal').style.opacity = '0';

    // Navigate after animation
    setTimeout(() => {
      navigate({ pathname: `/design` });
    }, 100);
  };

  // Handle form submission success
  useEffect(() => {
    if (state.succeeded) {
      // Clear message after successful submission
      localStorage.removeItem('message');
    }
  }, [state.succeeded]);

  // Handle email changes
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  // Handle message changes
  useEffect(() => {
    localStorage.setItem('message', message);
  }, [message]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleDoubleClick = () => {
      handleClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('dblclick', handleDoubleClick);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  if (state.succeeded) {
    return (
      <div id="thanks-message">
        <div id="ty-wrapper">
          <h1 className="modal-h1">
            Thank you!
            <br /> Hope I read it soon.
          </h1>
          <div
            className="modal-button"
            onClick={() => {
              navigate({ pathname: `/design` });
              localStorage.removeItem('message');
            }}
          >
            RETURN
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="contact-modal">
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="top" style={{ animationDelay: '0.3s' }}>
          <label className="label" htmlFor="email">
            Reach out
          </label>
        </div>
        <input
          id="email"
          ref={emailRef}
          style={{ animationDelay: '0.9s' }}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea
          id="message"
          style={{ animationDelay: '1.2s' }}
          name="message"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button
          className="modal-button"
          style={{ opacity: message.length > 5 ? 1 : 0.5 }}
          type="submit"
          disabled={state.submitting || message.length <= 5}
        >
          {state.submitting ? 'SENDING...' : 'SEND'}
        </button>
        <div className="modal-close" onClick={handleClose}></div>
      </form>
    </div>
  );
}

export default ContactForm;
