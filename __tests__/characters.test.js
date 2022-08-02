const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('characters routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of characters with nested quotes', async () => {
    const res = await request(app).get('/characters');
    expect(res.body.length).toEqual(7);

  });

  afterAll(() => {
    pool.end();
  });
});
