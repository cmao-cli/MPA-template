import path from 'path';

const ENV = process.env.NODE_ENV || 'local';
const config = (function():Record<string, any> {
  let defaultConf;
  let config;
  try {
    defaultConf = require(path.join(__dirname, '../../config/default.json'));
    config = require(path.join(__dirname, `../../config/${ENV}.json`));
  } catch (e) {
    if (!defaultConf) {
      throw new Error('Can not resolve default config file!');
    }
    if (!config) {
      throw new Error(`Can not resolve config file for env "${ENV}"!`);
    }
  }
  return Object.assign(
    { ENV },
    defaultConf,
    config,
  );
})();

export = config;
