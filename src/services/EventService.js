import { firestore } from './firebase';

export const addEvent = (eventData) => {
  return firestore.collection('events').add(eventData);
};

export const getEvents = () => {
  return firestore.collection('events').get();
};
