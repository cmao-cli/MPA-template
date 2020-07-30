import path from 'path';

type Config = {
  ENV:string;
  serverPort:number;
  runtime:{
    cdnBase:string;
  };
};

const ENV = process.env.NODE_ENV || 'local';
const config:Config = (function():Config {
  let defaultConf;
  let envConfig;
  try {
    defaultConf = require(path.join(__dirname, '../../config/default.json'));
    envConfig = require(path.join(__dirname, `../../config/${ENV}.json`));
  } catch (e) {
    if (!defaultConf) {
      throw new Error('Can not resolve default config file!');
    }

    if (!envConfig) {
      throw new Error(`Can not resolve config file for env "${ENV}"!`);
    }
  }
  const config:Config = {
    ENV,
    serverPort: 5000,
    runtime: {
      cdnBase: '',
    },
  };
  return Object.assign(config, defaultConf, envConfig);
})();

export { config };
