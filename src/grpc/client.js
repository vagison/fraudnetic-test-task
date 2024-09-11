import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { gRPCConfig } from './configs';

const PROTO_PATH = `${__dirname}/proto/event.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const eventProto = grpc.loadPackageDefinition(packageDefinition).event;

const client = new eventProto.EventService(
  gRPCConfig.serverUri,
  grpc.credentials.createInsecure(),
);

function sendEvent(eventName, browserHash, callback) {
  const data = { eventName, browserHash };

  client.sendEvent(data, (err, response) => {
    if (err) {
      console.error('Error occurred while sending event:', err);

      return callback(err, null);
    }

    return callback(null, response);
  });
}

export { sendEvent };
