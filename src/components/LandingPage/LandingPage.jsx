import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Welcome to SomniScript!
            Your gateway to understanding the mysteries of your subconscious mind.

            Are you curious about the meaning behind that perplexing dream you had last
            night? Wondering if your dreams hold secrets, messages, or insights?
          </p>

          <p>
            Our cutting-edge technology, powered by ChatGPT, will unravel the symbolism and
            significance hidden within your dreams! Whether your dreams are whimsical,
            surreal, or even a bit unsettling, SomniScript is here to decode their meaning and
            provide you with personalized interpretations!
          </p>

          <p>
            Join our vibrant community of dreamers, explorers, and seekers! SomniScript
            is not just a website; it's a place where dreams come to life, where mysteries
            are unraveled, and where you can connect with others who share your fascination
            with the subconscious!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
