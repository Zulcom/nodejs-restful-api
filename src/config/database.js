import mongoose from 'mongoose';
import constants from './constants';

// remove mongoose promise warn
mongoose.Promise = global.Promise;

const connectOptions = {
  useMongoClient: true
};

// connect or createConnection for MongoDB URL
try {
  mongoose.connect(constants.MONGO_URL, connectOptions);
} catch (err) {
  if (err) console.log(err);
  mongoose.createConnection(constants.MONGO_URL, connectOptions);
}

mongoose.connection
  .on('error', err => {
    console.log(err);
  })
  .once('open', () => {
    console.log('mongoDB runing.');
  });
