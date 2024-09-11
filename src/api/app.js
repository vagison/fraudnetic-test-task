import fastify from 'fastify';

import { connectToDb } from '../shared/db';
import logger from './utils/logger';
import { eventRoutes } from './routes';

async function start() {
  await connectToDb();
  const app = fastify({ logger });
  app.register(eventRoutes, { prefix: '/api/v1' });
  const PORT = +process.env.API_PORT || 3000;
  app.listen({ port: PORT }, (err) => {
    if (err) { process.exit(1); }
  });
}

start();
