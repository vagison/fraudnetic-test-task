const transformEvent = (event) => ({
  id: event.id,
  eventName: event.event_name,
  browserHash: event.browser_hash,
  createdAt: event.created_at,
});

const transformEvents = (events) => events.map((event) => transformEvent(event));

export { transformEvent, transformEvents };
