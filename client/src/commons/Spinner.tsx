import React from 'react';
import brand from '../assets/brand.png';
import branding from '../assets/branding.svg';
import Image from 'next/image';
import 'animate.css';

const Spinner = () => {
  return (
    <div className="SpinnerDiv">
      <Image
        className="spin animate__animated animate__flip animate__slow  animate__infinite"
        src={branding}
        alt="Fast Delivery Brand"
      />
    </div>
  );
};

export default Spinner;
