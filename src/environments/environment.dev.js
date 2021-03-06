const userHost = 'http://wakanda-academy-be.herokuapp.com';
const landingpageUrl = 'http://wakanda-landingpage-be.herokuapp.com';
const common = require('./common');

const env = {
  production: false,
  apiUrl: userHost + common.wakanda.baseBath + '/user/create',
  userHost: userHost,
  landingpageUrl: landingpageUrl,
  ...common
};

module.exports = env;
