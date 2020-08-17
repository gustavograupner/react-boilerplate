import React from "react";
import {
  Button,
  Card,
  TextField,
  CardRow,
  Tab,
  CardColumn,
  DropdownField,
  DatePickerField,
  Checkbox
} from "../../../components";
import formFields from "./formFields";
import useListOperation from "./useListOperation";

const ListOperation = () => {
  const {
    formState,
    generos,
    handleEditOperation,
    handleEventChange
  } = useListOperation();

  const renderTextField = () => (
    <Card>
      <CardColumn>
        <CardRow>
          <TextField
            label="Código"
            name={formFields.CODIGO}
            value={formState[formFields.CODIGO]}
            onChange={handleEventChange}
          />
          <TextField
            label="Nome"
            name={formFields.NOME}
            value={formState[formFields.NOME]}
            onChange={handleEventChange}
          />
          <TextField
            label="Endereço"
            name={formFields.ENDERECO}
            value={formState[formFields.ENDERECO]}
            onChange={handleEventChange}
          />
        </CardRow>
        <CardRow>
          <DropdownField
            name={formFields.GENERO}
            options={generos}
            valueField="codigoGenero"
            labelField="descricaoGenero"
            label="Gênero"
            value={formState[formFields.GENERO]}
            onChange={handleEventChange}
          />
          <DatePickerField
            name={formFields.DATA_SELECIONADA}
            label={"Data selecionada"}
            value={formState[formFields.DATA_SELECIONADA]}
            onChange={handleEventChange}
          />
          <Checkbox
            name={formFields.CHECKBOX}
            label="Checkbox para teste"
            checked={formState[formFields.CHECKBOX]}
            onCheck={handleEventChange}
          />
        </CardRow>
      </CardColumn>
    </Card>
  );

  const renderTabs = () => [
    {
      index: 1,
      description: "TextField",
      component: renderTextField
    }
  ];

  return (
    <>
      <Button confirm label="Editar Operação" onClick={handleEditOperation} />
      <Tab tabs={renderTabs()} selectedTabIndex={1}></Tab>;
    </>
  );
};

export default ListOperation;
