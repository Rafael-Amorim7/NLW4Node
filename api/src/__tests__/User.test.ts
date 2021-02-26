import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  })
  
  it("Should be able to create a new user", async () => {
  const res = await request(app).post("/users")
  .send({
    name: 'Rafael Example',
    email: 'rafa_example@hotmail.com'
  });

    expect(res.status).toBe(201);
  })
})