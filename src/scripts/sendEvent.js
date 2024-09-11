import { sendEvent } from '../grpc/client';

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node cli.js <eventName> <browserHash>');
  process.exit(1);
}

const [eventName, browserHash] = args;

sendEvent(eventName, browserHash, (err, response) => {
  if (err) {
    console.error('Failed to send event:', err);
    process.exit(1);
  }

  console.log('Event sent successfully. \nResponse:', response);
  process.exit(0);
});
