import React from 'react';
import FleetCard from './FleetCard';
import FleetHeader from './FleetHeader';
import { luxuryCarImages, carFeatures } from '../../constants/carImages';

const Fleet = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <FleetHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxuryCarImages.fleet.map((car) => (
            <FleetCard
              key={car.id}
              image={car.image}
              name={car.name}
              description={car.description}
              features={carFeatures[car.id as keyof typeof carFeatures]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;