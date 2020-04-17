import React, { useState, useEffect, useCallback } from 'react';

const EditOperation = ({history}) => {
  
  const [operationCode, setOperationCode] = useState(null);

  useEffect(() => {
    if (history && history.location) {
      const { state } = history.location
      setOperationCode(state.operationCode);
    }
  }, [history]);

  const handleBackToOperationList = useCallback(
    () => {
      history.goBack();
    }, [history]
  );

  return (
    <>
      <h5>
        Editar Operação: {operationCode}
      </h5>
      <button onClick={handleBackToOperationList}>
        Voltar
      </button>
    </>
  )
}

export default EditOperation;