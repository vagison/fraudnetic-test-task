import dotenv from 'dotenv';

dotenv.config();

const gRPCConfig = {
  serverPort: +process.env.GRPC_PORT || 50051,
  serverUri: `localhost:${+process.env.GRPC_PORT || 50051}`,
};

export { gRPCConfig };
