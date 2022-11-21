import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';


declare global {
  var signin: () => string[];
}

jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfghjkl';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
},500000);

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });


global.signin = () => {
   // Build a JWT PAYLOAD. {id, email}
  const id = new mongoose.Types.ObjectId().toHexString()

  const payload = {
    id: id,
    email: 'test@test.com'
  }
   // create JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!)
   // Build session Object. {jwt :MY_TWT}
  const session = {jwt: token}
   // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)
   // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')
   // return a string thats the cookie with the encode 


  return [`session=${base64}`];
  }
 