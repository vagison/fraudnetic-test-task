import { sendEvent } from '../../grpc/client';
import { db } from '../../shared/db';
import { eventQueries } from '../../shared/db/queries';
import { transformEvents } from '../../shared/transformers/event';
import { paginate, generatePaginatedRes } from '../../shared/utils/pagination';

const getEvents = async (req, reply) => {
  const paginationInfo = paginate(req);
  const eventsResult = await db.query(eventQueries.getEvents(req.query.direction), [paginationInfo.limit, paginationInfo.offset]);
  const events = eventsResult.rows;
  const countResult = await db.query(eventQueries.countEvents());
  const total = parseInt(countResult.rows[0].count, 10);

  const result = generatePaginatedRes(
    transformEvents(events),
    {
      total,
      page: paginationInfo.page,
      limit: paginationInfo.limit,
    },
  );

  return reply.code(200).send(result);
};

const addEvent = async (req, reply) => {
  const { eventName, browserHash } = req.body;

  const grpcResponse = await new Promise((resolve, reject) => {
    sendEvent(eventName, browserHash, (err, response) => {
      if (err) {
        return reject(new Error('There was an error while receiveing the response from gRPC client'));
      }

      resolve(response);
    });
  });

  return reply.code(201).send(grpcResponse.event);
};

export {
  getEvents,
  addEvent,
};
