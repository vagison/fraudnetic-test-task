const Event = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    eventName: {
      type: 'string',
    },
    browserHash: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export default Event;
