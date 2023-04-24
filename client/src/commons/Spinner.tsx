import React from 'react';
import brand from '../assets/brand.png';
import Image from 'next/image';
import 'animate.css';

const Spinner = () => {
  return (
    <div className="SpinnerDiv">
      <Image
        className="spin animate__animated animate__flip animate__slow  animate__infinite"
        src={brand}
        alt="Fast Delivery Brand"
      />
    </div>
  );
};

export default Spinner;
