import { promisify } from 'util';
import { createConnection } from 'mysql';

import { required } from './arguments';

export interface Queryer {
  init(): Promise<void>;
  query(sql: string): Promise<any>;
  close(): Promise<void>;
}

function createQueryer(): Queryer {
  const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: required('password'),
    database: 'test',
  });

  return {
    init: () => new Promise<void>((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }),
    query: promisify(connection.query.bind(connection)),
    close: () => new Promise<void>((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }),
  };
}

export default createQueryer;
