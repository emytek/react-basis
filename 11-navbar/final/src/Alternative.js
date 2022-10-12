import Navbar from "./Navbar"

// NOTE: this method can still produce this Result, but it is not the standard way of doing the Navbar..cos the conditional rendering just mounts the state rapidly

import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.svg';

const Alternative = () => {
  const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef(null);
//   const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
};
return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        {showLinks && ( 
            <div className='links-container show-container' >
            <ul className='links' ref={linksRef}>
                {links.map((link) => {
                const { id, url, text } = link;
                return (
                    // originally, this was hardcoded
                    <li key={id}>
                    <a href={url}>{text}</a>
                    </li>
                );
                })}
            </ul>
            </div>
        )}
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

//OR you use conditional classnames

return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div> 
            <div className={`${showLinks ? 'links-container' : 'links-container show-container'}`} >
            {/* <div className={`links-container ${showLinks && 'links-container show-container'}`} > */}
            {/* the conditional classnames is rendered above */}
            <ul className='links' ref={linksRef}>
                {links.map((link) => {
                const { id, url, text } = link;
                return (
                    // originally, this was hardcoded
                    <li key={id}>
                    <a href={url}>{text}</a>
                    </li>
                );
                })}
            </ul>
            </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>

  );
export default Alternative;