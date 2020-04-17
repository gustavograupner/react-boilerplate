import MainService from './main.service';

export default class OperationService extends MainService {
  private path;

  constructor() {
    super();
    this.path = '/v1/operation';
  }

  listOperations = () => {
    return this.get(`${this.path}/list-operations`);
  }
}