import fetchIntercept from 'fetch-intercept';

export default { 
  setupInterceptors: (callback) => {
    fetchIntercept.register({
      response: function (response) {
        if (response.status === 401) {
          callback();
        }
        return response;
      }
    });
  }
}