import React from 'react';
import Navigation from '../Navigation/Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import WhatsAppButton from '../WhatsAppButton';
import AnimatedBackground from '../common/AnimatedBackground';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AnimatedBackground />
      <Navigation />
      <LanguageSwitcher />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;