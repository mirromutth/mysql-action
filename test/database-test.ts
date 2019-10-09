import { expect } from 'chai';

import createQueryer from './connection';

describe('Database', () => {
  const queryer = createQueryer();

  before('Connect', queryer.init);
  after('Disconnect', queryer.close);

  describe('#select', () => {
    it('should return tables for current database', async () => {
      const results = await queryer.query('SHOW TABLES');
      expect(results).to.be.a('array');
    });
    it('should return informations for other database', async () => {
      const results = await queryer.query('SELECT * FROM information_schema.innodb_trx');
      expect(results).to.be.a('array');
    });
  });
});
