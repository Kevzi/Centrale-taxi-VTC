import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/Hero/Hero';
import Fleet from './components/Fleet/Fleet';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials/Testimonials';

function App() {
  return (
    <Layout>
      <Hero />
      <Fleet />
      <section id="booking" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <BookingForm />
        </div>
      </section>
      <Testimonials />
    </Layout>
  );
}

export default App;