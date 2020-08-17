import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";
import OperationService from "../services/operation.service";
import formFields from "./formFields";

export default () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    [formFields.CODIGO]: 0,
    [formFields.NOME]: "",
    [formFields.ENDERECO]: "",
    [formFields.TELEFONE]: "",
    [formFields.RESPONSAVEL]: "",
    [formFields.GENERO]: 3,
    [formFields.DATA_SELECIONADA]: new Date(),
    [formFields.CHECKBOX]: false
  });

  const generos = [
    {
      codigoGenero: 1,
      descricaoGenero: "Feminino"
    },
    {
      codigoGenero: 2,
      descricaoGenero: "Masculino"
    }
  ];

  useEffect(() => {
    OperationService().getExample();
  }, [OperationService]);

  const handleEditOperation = useCallback(() => {
    history.push({
      pathname: routes.EDIT_OPERATION,
      state: { operationCode: "1" }
    });
  }, [history]);

  const handleEventChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  return {
    formState,
    generos,
    handleEditOperation,
    handleEventChange
  };
};
