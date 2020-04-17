import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import routes from '../constants/routes';

const ListOperation = () => {

  const history = useHistory();

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