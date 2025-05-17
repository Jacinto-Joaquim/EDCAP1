
    import React from 'react';

    const SectionTitle = ({ children, className = '' }) => (
      <h2 className={`text-3xl md:text-4xl font-bold font-lato text-center mb-12 md:mb-16 text-primary ${className}`}>
        {children}
      </h2>
    );

    export default SectionTitle;
  