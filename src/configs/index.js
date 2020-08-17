const config = {
  api: {
    host: process.env.REACT_APP_BASE_URL,
    timeout: 20000,
  },
};

const API_HOST = config.api.host;

export {API_HOST};
