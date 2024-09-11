import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import consola from 'consola';

import { sendEvent } from './services/eventService';
import { connectToDb } from '../shared/db';
import { gRPCConfig } from './configs';

const PROTO_PATH = `${__dirname}/proto/event.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const eventProto = grpc.loadPackageDefinition(packageDefinition).event;

async function start() {
  await connectToDb();
  const server = new grpc.Server();
  server.addService(eventProto.EventService.service, { sendEvent });
  const PORT = gRPCConfig.serverPort;
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      consola.error({ message: `Failed to bind gRPC server: "${err}"`, badge: true });
      process.exit(1);
    } else {
      consola.success({ message: `gRPC server is running on port ${port}`, badge: true });
    }
  });
}

start();
