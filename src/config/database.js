import mongoose from 'mongoose';
import constants from './constants';

// remove mongoose promise warn
mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL, { useMongoClient: true });
} catch (err) {
  if (err) console.log(err);
  mongoose.createConnection(constants.MONGO_URL, { useMongoClient: true });
}

mongoose.connection
  .on('error', error => {
    console.log(error);
  }).once('open', () => {
    console.log('mongoDB runing.');
  });
