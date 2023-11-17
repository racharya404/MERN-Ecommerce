import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import EventCard from './EventCard';

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-12 border-0'>
            {allEvents.length !== 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))
            ) : (
              <h4>No Events have!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
