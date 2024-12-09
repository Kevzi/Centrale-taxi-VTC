import React from 'react';
import { MapPin, Users, Clock, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: MapPin,
    title: 'Airport Transfers',
    description: 'Reliable and punctual airport pickup and drop-off service',
    imageUrl: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Users,
    title: 'Corporate Travel',
    description: 'Professional service for business executives and teams',
    imageUrl: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Clock,
    title: 'Special Events',
    description: 'Make your special occasions more memorable',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Shield,
    title: 'City Tours',
    description: 'Explore the city in comfort and style',
    imageUrl: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3e6?auto=format&fit=crop&w=800&q=80'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;