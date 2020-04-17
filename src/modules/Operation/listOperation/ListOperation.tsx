import React, { useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import routes from '../constants/routes';
import OperationService from '../services/operation.service';

const ListOperation = () => {

  const history = useHistory();
  const operationService = new OperationService();

  useEffect(() => {
    operationService.listOperations();
  }, [operationService])

  const handleEditOperation = useCallback(
    () => {
      history.push({
        pathname: routes.EDIT_OPERATION, 
        state: { operationCode: '1' }
      })
    }, [history]
  );

  return (
    <>
      <h5>Operação</h5>
      <button onClick={handleEditOperation}>
        Editar Operação
      </button>
    </>
  )
}

export default ListOperation;