import React, { useCallback, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate, useLocation } from 'react-router-dom';

import './ContactForm.css';

const ARCHIVE_COMMENTS_URL = 'https://getdagnis-worker-prod.getdagnis.workers.dev/archive-comments';

function getArchiveCommentStorageKey(projectKey) {
  return `archive-comment-${projectKey}-text`;
}

function ContactForm() {
  const [state, handleSubmit] = useForm('mblrvgbl');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [archiveError, setArchiveError] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const archiveProjectKey = location.state?.archiveProjectKey || searchParams.get('archiveProjectKey');
  const archiveProjectName = location.state?.archiveProjectName || searchParams.get('archiveProjectName');
  const isArchiveComment = Boolean(archiveProjectKey && archiveProjectName);
  const archiveCommentStorageKey = isArchiveComment ? getArchiveCommentStorageKey(archiveProjectKey) : null;
  const returnPath = isArchiveComment ? `/design/project/${archiveProjectKey}` : '/design';
  const emailIsValid =
    (isArchiveComment && email.trim() === '') ||
    /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,4}$/.test(email.trim());

  useEffect(() => {
    const loadValues = () => {
      const savedEmail = localStorage.getItem('email');
      const savedMessage = localStorage.getItem(archiveCommentStorageKey || 'message');

      if (savedEmail) setEmail(savedEmail);
      if (savedMessage) setMessage(savedMessage);
    };

    loadValues();
  }, [archiveCommentStorageKey]);

  useEffect(() => {
    if (!isArchiveComment && location.state?.userMessage) {
      setMessage('It generated this one for me: \n\n' + location.state.userMessage);
    }
  }, [isArchiveComment, location.state?.userMessage]);

  useEffect(() => {
    const focusTarget = isArchiveComment ? messageRef.current : emailRef.current;
    if (focusTarget) {
      focusTarget.focus();
    }
  }, [isArchiveComment]);

  const handleClose = useCallback(() => {
    localStorage.setItem('email', email);
    localStorage.setItem(archiveCommentStorageKey || 'message', message);

    // Remove focus and fade out
    document.getElementById('contact-modal').style.opacity = '0';

    // Navigate after animation
    setTimeout(() => {
      navigate({ pathname: returnPath });
    }, 100);
  }, [archiveCommentStorageKey, email, message, navigate, returnPath]);

  // Handle form submission success
  useEffect(() => {
    if (state.succeeded) {
      // Clear message after successful submission
      if (isArchiveComment) {
        localStorage.setItem(archiveCommentStorageKey, 'submitted');
      } else {
        localStorage.removeItem('message');
      }
    }
  }, [archiveCommentStorageKey, isArchiveComment, state.succeeded]);

  // Handle email changes
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  // Handle message changes
  useEffect(() => {
    localStorage.setItem(archiveCommentStorageKey || 'message', message);
  }, [archiveCommentStorageKey, message]);

  const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    const formspreeSubmission = handleSubmit(event);

    if (isArchiveComment) {
      setArchiveError('');

      try {
        const response = await fetch(ARCHIVE_COMMENTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectKey: archiveProjectKey,
            reason: message,
            email: email.trim() || null,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
            device: navigator.userAgent,
          }),
        });

        if (!response.ok) throw new Error(`Archive comment failed with status ${response.status}`);

        const metadata = await response.json();
        Object.entries({
          archive_country: metadata.country || 'unknown',
          archive_device: metadata.device || 'unknown',
          archive_submitted_at: metadata.submittedAt || 'unknown',
        }).forEach(([name, value]) => {
          const field = form.elements.namedItem(name);
          if (field) field.value = value;
        });
      } catch (error) {
        console.error('Archive comment failed:', error);
        setArchiveError('Archive metadata could not be saved, but your email will still be sent.');
      }
    }

    await formspreeSubmission;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClose]);

  if (state.succeeded) {
    return (
      <div id="thanks-message">
        <div id="ty-wrapper">
          <h1 className="modal-h1">
            Thank you!
            <br /> I hope I read it soon.
          </h1>
          <div
            className="modal-button"
            onClick={() => {
              navigate({ pathname: returnPath });
              if (!isArchiveComment) localStorage.removeItem('message');
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
      <form id="contact-form" onSubmit={handleFormSubmit}>
        <div className="top" style={{ animationDelay: '0.3s' }}>
          <label className="label" htmlFor="email">
            {isArchiveComment ? 'Tell me why...' : 'Reach out'}
          </label>
        </div>
        {isArchiveComment && (
          <label className="archive-comment-label" htmlFor="message">
            {archiveProjectName} needs to be uploaded:
          </label>
        )}
        <textarea
          id="message"
          ref={messageRef}
          style={{ animationDelay: '1.2s' }}
          name="message"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <input
          id="email"
          ref={emailRef}
          style={{ animationDelay: '0.9s' }}
          type="email"
          name="_replyto"
          placeholder="optional reply-to email"
          pattern="[A-Za-z0-9._-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,4}"
          value={email}
          required={!isArchiveComment}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ValidationError prefix="Email" field="_replyto" errors={state.errors} />
        {isArchiveComment && (
          <>
            <input type="hidden" name="archive_project" value={archiveProjectName} readOnly />
            <input type="hidden" name="archive_project_key" value={archiveProjectKey} readOnly />
            <input type="hidden" name="archive_country" readOnly />
            <input type="hidden" name="archive_device" readOnly />
            <input type="hidden" name="archive_submitted_at" readOnly />
          </>
        )}
        {archiveError && <div className="error">{archiveError}</div>}
        <button
          className="modal-button"
          style={{ opacity: message.trim().length > 5 && emailIsValid ? 1 : 0.5 }}
          type="submit"
          disabled={state.submitting || message.trim().length <= 5 || !emailIsValid}
        >
          {state.submitting ? 'SENDING...' : 'SEND'}
        </button>
        <div className="modal-close" onClick={handleClose}></div>
      </form>
    </div>
  );
}

export default ContactForm;
