import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/EventService';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventList = await getEvents();
      setEvents(eventList.docs.map(doc => doc.data()));
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventList;
