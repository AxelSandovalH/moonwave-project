import React from 'react';
import SplashScreen from '@components/animations/SplashScreen'
import Hero from '@components/sections/Hero';
import ScrollHistory from '@components/animations/ScrollHistory';
import Catalog from '@components/sections/Catalog';
import Announcement from '@components/sections/Announcement';
import Graffiti from '@components/sections/Graffiti';
import Coffee from '@components/sections/Coffee';
import Falling from '@components/animations/Falling';
import Footer from '@components/sections/Footer';

function App() {
  
  return (
    <>
    {/* <SplashScreen /> */}
    <Hero />
    <ScrollHistory />
    <Catalog />
    <Announcement />
    <Graffiti />
    <Coffee />
    <Falling />
    <Footer />
    </>
  )
}

export default App
