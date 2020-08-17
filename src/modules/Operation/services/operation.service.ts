import MainService from "./main.service";

interface OperationInterface {
  getExample(): void;
}

export default () => {
  const publicMethods: OperationInterface = {
    getExample: () => {
      return new MainService().get(`/get-example`);
    }
  };

  return publicMethods;
};
