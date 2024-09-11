import pino from 'pino';
import pinoPretty from 'pino-pretty';

const logger = pino({
  level: 'info',
}, pinoPretty());

export default logger;
