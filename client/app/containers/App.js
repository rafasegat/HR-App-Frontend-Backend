import React, { Component } from 'react';

import Footer from '../components/Footer/Footer';

const App = ({ children }) => (
  <>

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
