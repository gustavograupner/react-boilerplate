import configs from '../../../configs';

export default class MainService {

    user: any = null;
    
    constructor() {
      const userTemp = localStorage.getItem('user');
      if (userTemp) {
        this.user = JSON.parse(userTemp);
      }
    }

    protected get(url) {
      return this.genericRequest("GET", url, null);
    }

    protected post(url, body) {
      return this.genericRequest("POST", url, body);
    }

    protected put(url, body) {
      return this.genericRequest("PUT", url, body);
    }

    protected delete(url) {
      return this.genericRequest("DELETE", url, null);
    }

    private genericRequest(method, url, body) {
      return new Promise(async (resolve, reject) => {
        const requestInit: any = {
          method,
          headers: { 
            'Content-type': 'application/json',
          }
        }
  
        // TODO TOKEN HERE
        if (this.user && this.user.token) {
          requestInit.headers.Authorization = `Bearer ${this.user.token}`;
        }
  
        if (body) {
          requestInit.body = JSON.stringify(body);
        }
  
        try {
          const response = await fetch(`${configs.operationApi}${url}`, requestInit);
          if (response) {
            resolve(response.json());
          }
        } catch (error) {
          reject(error)
        }
      });
    }

}