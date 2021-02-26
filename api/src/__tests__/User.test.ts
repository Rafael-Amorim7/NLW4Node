import request from 'supertest';
import { app } from '../app';

describe('Users', () => {
  
  request(app).post("/users")
  .send({
    name: 'Rafael Example',
    email: 'rafa_example@hotmail.com'
  })
})