import mongoose,{ConnectOptions} from 'mongoose';
import {app} from './app'

const start = async () => {
  console.log("starting up ..........")
  if (!process.env.MONGO_URI)
  {
    throw new Error('MONGO_URL MUST BE DEFINED')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
