import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = (props) => {
    return (
        <div className="footer">
            <p>
              Legal Disclaimer: Data presented on this website comes from publicly available hospital chargemasters; 
              however, there is no guarantee that this data is accurate or up to date. You should always consult with 
              healthcare professionals prior to making decisions about your healthcare.
            </p>
        </div>
    )
};

export default Footer;