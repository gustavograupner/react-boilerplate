let config;

switch (process.env.NODE_ENV) {
	case 'dev':
    config = require('./config.devel');
    break;
  case 'homol':
    config = require('./config.homol');
    break;
  case 'prod':
    config = require('./config.prod');
    break;
	default:
    config = require('./config.devel');
		break;
}

export default config;