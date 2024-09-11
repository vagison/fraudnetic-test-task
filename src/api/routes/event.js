import { eventController } from '../controllers';
import { Event, Meta } from '../schemas';

const getEventsOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        required: ['data', 'meta'],
        properties: {
          data: {
            type: 'array',
            items: Event,
          },
          meta: Meta,
        },
      },
    },
  },
  handler: eventController.getEvents,
};

const postEventOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['eventName', 'browserHash'],
      properties: {
        eventName: {
          type: 'string',
        },
        browserHash: {
          type: 'string',
        },
      },
    },
    response: {
      201: Event,
    },
  },
  handler: eventController.addEvent,
};

function eventRoutes(fastify, options, done) {
  fastify.get('/events', getEventsOpts);
  fastify.post('/events', postEventOpts);
  done();
}

export default eventRoutes;
