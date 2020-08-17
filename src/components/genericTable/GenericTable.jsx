import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import PaginationTable from "./PaginationTable";
import { Search, Edit2, Trash } from "react-feather";
import { Button } from "..";
import genericTableStyle from "./genericTable.module.scss";
import { useTranslation } from "react-i18next";
import Spinner from "../spinner/Spinner";
import Checkbox from "../checkbox/Checkbox";

const MAX_PAGE_ROWS = 15;
const INITIAL_PAGE = 1;

const GenericTable = props => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({});
  const [intRows, setIntRows] = useState(
    props.rowsPage ? props.rowsPage : MAX_PAGE_ROWS
  );
  const [intPage, setIntPage] = useState(INITIAL_PAGE);
  const [filteredRows, setFilteredRows] = useState(props.arrRow);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filters = {};
    props.arrHeader.forEach(header => {
      filters[header.field] = "";
    });
    setFilters(filters);
  }, []);

  useEffect(() => {
    setFilteredRows(props.arrRow);
    filter();
  }, [props.arrRow]);

  const goToPage = useCallback(intPage => {
    setIntPage(intPage);
  }, []);

  const renderCellContent = (header, row, index) => {
    if (
      header &&
      (header.action || header.onMouseEnter || header.onMouseLeave)
    ) {
      if (header.type === "button") {
        if (row[header.field] === null) {
          return (
            <Button
              label={header.description}
              onClick={header.action ? header.action(row, index) : null}
              confirm
            />
          );
        } else {
          return null;
        }
      } else if (header.type === "multi-action" && header.action) {
        const object = row[header.data];
        return object?.map((item, i) => (
          <React.Fragment key={i}>
            <span
              key={`${index}-${item.key}`}
              style={{ margin: "0px 5px 0px 0px" }}
              className={
                !header.activation ||
                (header.activation && header.activation(item))
                  ? genericTableStyle.actionCell
                  : null
              }
              onClick={
                header.action &&
                (!header.activation ||
                  (header.activation && header.activation(item)))
                  ? header.action(row, index, item.value)
                  : null
              }
            >
              {item.label}
            </span>
            <br />
          </React.Fragment>
        ));
      } else {
        return (
          <span
            className={genericTableStyle.actionCell}
            onClick={header.action ? header.action(row, index) : null}
            onMouseEnter={
              header.onMouseEnter ? header.onMouseEnter(row, index) : null
            }
            onMouseLeave={
              header.onMouseLeave ? header.onMouseLeave(row, index) : null
            }
          >
            {row[header.field]}
          </span>
        );
      }
    }
    if (header && header.type && header.type === "datetime") {
      if (row[header.field] !== null) {
        const date = new Date(Date.parse(row[header.field]));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${date.getDate()}-${t(`month_${date.getMonth()}`).substring(
          0,
          3
        )}-${date.getFullYear()} ${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;
      } else {
        return "";
      }
    }
    if (header && header.type && header.type === "datemonth") {
      if (row[header.field] !== undefined) {
        const date = row[header.field];
        const month = date.substring(5, 7);
        const year = date.substring(0, 4);
        return `${t(`month_${month - 1}`).substring(0, 3)}-${year}`;
      } else {
        return "";
      }
    }
    if (header && header.type && header.type === "date") {
      return new Date(Date.parse(row[header.field])).toLocaleDateString();
    }
    // if ( header && (header.type && header.type==="image") ) {
    //   return <CardImage
    //     name="image"
    //     src={row[header.field]}
    //     margin="6px 0px"
    //     size={60}
    //     disableDownload
    //   />;
    // }
    return row[header.field];
  };

  const filter = () => {
    setLoading(true);

    const emptyFilters = [];
    props.arrHeader.forEach(header => {
      emptyFilters.push(!filters[header.field]);
    });

    if (!emptyFilters.some(emptyFilter => emptyFilter === false)) {
      setFilteredRows(props.arrRow);
      setLoading(false);
      return;
    }

    const filteredValues = props.arrRow.filter(row => {
      let include = true;
      props.arrHeader.forEach(header => {
        if (
          filters[header.field] &&
          header.type !== "datemonth" &&
          header.type !== "multi-action" &&
          filters[header.field] !== " "
        ) {
          include &= row[header.field]
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(
              filters[header.field]
                .toString()
                .trim()
                .toLowerCase()
            );
        }
        if (filters[header.field] && header.type === "datemonth") {
          const date = row[header.field];
          const month = date?.substring(5, 7);
          const year = date?.substring(0, 4);
          include &= `${t(`month_${month - 1}`)?.substring(0, 3)}-${year}`
            .toString()
            .trim()
            .toLowerCase()
            .includes(
              filters[header.field]
                .toString()
                .trim()
                .toLowerCase()
            );
        }
        if (filters[header.field] && header.type === "multi-action") {
          include &= JSON.stringify(row[header.field])
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(
              filters[header.field]
                .toString()
                .trim()
                .toLowerCase()
            );
        }
        if (filters[header.field] && filters[header.field] === " ") {
          include &=
            !row[header.field] ||
            typeof row[header.field] === undefined ||
            row[header.field] === null;
        }
      });
      return include;
    });
    setFilteredRows(filteredValues);

    setLoading(false);
  };

  const renderHeaders = () => {
    if (props.arrHeader) {
      return (
        <thead>
          <tr>
            {props.onCheck ? <th></th> : null}
            {renderHeader(props.arrHeader)}
            {props.onRemove ? <th></th> : null}
            {props.onEdit ? <th></th> : null}
          </tr>
          {props.searchable ? (
            <tr>
              {props.onCheck ? <th></th> : null}
              {renderHeaderSearch(props.arrHeader)}
              {props.onRemove ? <th></th> : null}
              {props.onEdit ? <th></th> : null}
            </tr>
          ) : null}
        </thead>
      );
    }
    return null;
  };

  const renderRows = () => {
    if (loading || props.loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={20}>
              <Spinner />
            </td>
          </tr>
        </tbody>
      );
    }
    if (filteredRows) {
      return (
        <tbody className={genericTableStyle.tbody}>
          {renderRow(filteredRows, props.arrHeader)}
        </tbody>
      );
    }
    return <span>{t("common_no_data")}</span>;
  };

  const renderHeader = headers =>
    headers.map((header, index) => (
      <th
        className={genericTableStyle.description}
        key={index}
        style={props.headerStyle ? props.headerStyle : null}
      >
        {header.type === "button" ? null : header.description}
      </th>
    ));

  const renderRemoveColumn = row => {
    if (props.onRemove) {
      return (
        <td style={{ textAlign: "center" }}>
          <span
            className={genericTableStyle.removeCell}
            onClick={props.onRemove(row)}
          >
            <Trash />
          </span>
        </td>
      );
    }
    return null;
  };

  const renderEditColumn = row => {
    if (props.onEdit) {
      return (
        <td style={{ textAlign: "center" }}>
          <span
            className={genericTableStyle.editCell}
            onClick={props.onEdit(row)}
          >
            <Edit2 />
          </span>
        </td>
      );
    }
    return null;
  };

  const renderCheckColumn = row => {
    if (props.onCheck) {
      return (
        <td style={{ textAlign: "center" }}>
          <Checkbox
            name="bol_check"
            value={row.bol_check}
            margin="0px 0px 0px -6px"
            onChange={evt => {
              props.onCheck(row, evt);
            }}
          />
        </td>
      );
    }
    return null;
  };

  const renderHeaderSearch = headers =>
    headers.map((header, index) => {
      return (
        <th key={index} style={props.headerStyle ? props.headerStyle : null}>
          {header.type !== "button" ? (
            <div className={genericTableStyle.searchFieldContainer}>
              <Search className={genericTableStyle.searchIcon} size={20} />
              <input
                className={genericTableStyle.searchField}
                onChange={event => {
                  const filtersTemp = filters;
                  filtersTemp[header.field] = event.target.value;
                  setFilters(filtersTemp);
                  filter();
                }}
              />
            </div>
          ) : null}
        </th>
      );
    });

  const renderRow = (rows, headers) =>
    rows.map((row, index) => {
      if (index >= intPage * intRows - intRows && index < intPage * intRows) {
        return (
          <tr key={index}>
            {renderCheckColumn(row)}
            {headers.map((header, indexHeader) => (
              <td key={indexHeader}>{renderCellContent(header, row, index)}</td>
            ))}
            {renderEditColumn(row)}
            {renderRemoveColumn(row)}
          </tr>
        );
      }
      return null;
    });

  const renderNewRegisterButton = () => {
    if (props.newRegister) {
      return (
        <div style={{ textAlign: "right" }}>
          <Button
            confirm
            label={props.newRegister.label}
            onClick={props.newRegister.onClick}
          />
        </div>
      );
    }
    return <div style={{ height: "12px" }}></div>;
  };

  return (
    <>
      {renderNewRegisterButton()}
      <div className={genericTableStyle.tableContainer}>
        <table id="genericTable" className={genericTableStyle.table}>
          {renderHeaders()}
          {renderRows()}
        </table>
      </div>
      <PaginationTable
        totalRows={filteredRows.length}
        rowsPerPage={intRows}
        selectedPage={intPage}
        goToPage={goToPage}
        setRowsPerPage={setIntRows}
      />
    </>
  );
};

GenericTable.propTypes = {
  arrRow: PropTypes.array,
  arrHeader: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      action: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      type: PropTypes.string
    })
  ).isRequired,
  headerStyle: PropTypes.object,
  newRegister: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  }),
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  searchable: PropTypes.bool,
  loading: PropTypes.bool,
  rowsPage: PropTypes.number
};

export default GenericTable;
