// MongoDB URL and app env

const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-dev'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-prod'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function switchConfig (env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...switchConfig(process.env.NODE_env)
};
