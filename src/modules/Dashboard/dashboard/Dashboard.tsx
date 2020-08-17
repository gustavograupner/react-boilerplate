import React from "react";
import { GenericTable, Tab } from "../../../components";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      index: 1,
      description: t("titulo"),
      component: () => (
        <GenericTable
          arrHeader={[
            { description: "Column", field: "str_column" },
            { description: "Column 1", field: "str_column1" },
            { description: "Column 2", field: "str_column2" },
            { description: "Column 3", field: "str_column3" },
            { description: "Column 4", field: "str_column4" },
            { description: "Column 5", field: "str_column5" },
            { description: "Column 6", field: "str_column6" },
            { description: "Column 7", field: "str_column7" },
            { description: "Column 8", field: "str_column8" },
            { description: "Column 9", field: "str_column9" },
            { description: "Column 10", field: "str_column10" }
          ]}
          arrRow={[
            {
              str_column: "Value",
              str_column1: "Value 1",
              str_column2: "Value 2",
              str_column3: "Value 3",
              str_column4: "Value 4",
              str_column5: "Value 5",
              str_column6: "Value 6",
              str_column7: "Value 7",
              str_column8: "Value 8",
              str_column9: "Value 9",
              str_column10: "Value 10"
            }
          ]}
        />
      )
    }
  ];

  return <Tab tabs={tabs} selectedTabIndex={1}></Tab>;
};

export default Dashboard;
