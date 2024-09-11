const TABLE_NAME = 'events';

const createTable = () => `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255),
    browser_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const getEvents = (direction) => `
  SELECT *
  FROM ${TABLE_NAME}
  ORDER BY created_at ${(direction && direction.toLowerCase()) === 'asc' ? 'ASC' : 'DESC'}
  LIMIT $1
  OFFSET $2
`;

const countEvents = () => `SELECT COUNT(*) FROM ${TABLE_NAME};`;

const insertEvent = () => `
  INSERT INTO ${TABLE_NAME}(event_name, browser_hash) 
  VALUES($1, $2) 
  RETURNING *;
`;

export {
  createTable,
  getEvents,
  countEvents,
  insertEvent,
};
