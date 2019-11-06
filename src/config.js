import path from 'path';
import AWS from 'aws-sdk';
import _ from 'lodash';
import ssmConfig from '@cludden/ssm-config';
import {
  EOL
} from 'os';

export const env = process.env.NODE_ENV || 'local';

// eslint-disable-next-line global-require, import/no-dynamic-require
const envConfig = require(`../config/local.json`);

const newlineRegex = /\\n/g;

// eslint-disable-next-line no-console
let appConfig = {};
const {
  configProvider
} = envConfig;


export const initAppConfig = async () => {
  appConfig = {
    ...envConfig
  };
  appConfig.APP_ROOT = path.join(__dirname, '..');


  AWS.config.region = configProvider.region;
  const ssm = new AWS.SSM();
  const remoteConfig1 = {
    prefix: configProvider.prefix,
    ssm
  };
  const secrets = ssmConfig(remoteConfig1);

  _.merge(appConfig, secrets);
  appConfig.jwt.publicKey = appConfig.jwt.publicKey.replace(newlineRegex, EOL);
  // console.log('appConfig', appConfig)
  return {
    ...appConfig
  };
};


export const getAppConfig = () => ({
  ...appConfig
});

export default {
  getAppConfig
};