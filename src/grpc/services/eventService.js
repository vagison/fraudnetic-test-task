import { db } from '../../shared/db';
import { insertEvent } from '../../shared/db/queries/event';
import { transformEvent } from '../../shared/transformers/event';

const sendEvent = async (call, callback) => {
  const { eventName, browserHash } = call.request;

  try {
    const eventResult = await db.query(insertEvent(), [eventName, browserHash]);
    const insertedEvent = eventResult.rows[0];
    const response = {
      message: 'Event successfully stored',
      event: transformEvent(insertedEvent),
    };

    console.log(response);

    return callback(null, response);
  } catch (err) {
    console.error('Database insert error: ', err);

    return callback(err, null);
  }
};

export { sendEvent };
