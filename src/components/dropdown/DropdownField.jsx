import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Label, TextField } from "..";
import { Search, X } from "react-feather";
import dropdownStyle from "./dropdownfield.module.scss";
import { useTranslation } from "react-i18next";

const DropdownField = props => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const optionsTemp = props.options ? props.options : [];
    setOptions(optionsTemp);
    setSelected(null);

    const selectedTemp = optionsTemp.filter
      ? optionsTemp.filter(option => {
          return props.value && option[props.valueField] === props.value;
        })
      : [];

    //IF ALREADY SELECTED SELECT IT
    if (selectedTemp.length > 0) {
      setSelected(selectedTemp[0]);
    }

    //IF ONLY ONE OPTION ALREADY SELECT IT
    if (optionsTemp.length === 1 && selectedTemp.length === 0) {
      setSelected(optionsTemp[0]);
      const res = {
        target: { value: optionsTemp[0][props.valueField], name: props.name }
      };
      props.onChange(res);
    }
  }, [props.options, props.value]);

  const handleEventChange = (event) => {
    if (event) {
      let optionsTemp = props.options.filter(option => {
        return (
          option[props.labelField]
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(
              event.target.value
                .toString()
                .trim()
                .toLowerCase()
            ) !== -1
        );
      });
      setText(event.target.value);
      setOptions(optionsTemp);
    }
  };

  const handleSelect = (evt, option) => {
    setShow(false);
    if (props.onChange) {
      props.onChange(props.name, option[props.valueField]);
    }
  };

  const handleShowList = () => (
    <div>
      <div className={dropdownStyle.dropdownList}>
        <div className={dropdownStyle.searchFieldContainer}>
          <Search className={dropdownStyle.searchIcon} size={20} />
          <input
            className={dropdownStyle.searchField}
            onChange={handleEventChange}
          />
        </div>
        {options.map((option, index) =>
          selected &&
          selected[props.valueField] === option[props.valueField] ? (
            <div className={dropdownStyle.dropdownOptionSelected} key={index}>
              {handleShowRowComponent(option)}
              <X
                onClick={evt => {
                  handleSelect(evt, { ...option, [props.valueField]: null });
                }}
                size={18}
              />
            </div>
          ) : (
            <div
              className={dropdownStyle.dropdownOption}
              key={index}
              onClick={evt => {
                handleSelect(evt, option);
              }}
            >
              {handleShowRowComponent(option)}
            </div>
          )
        )}
      </div>
      <div
        className={dropdownStyle.dropdownOuterList}
        onClick={evt => {
          setShow(false);
        }}
      ></div>
    </div>
  );

  const handleShowRowComponent = option => {
    return <Label label={option[props.labelField]} />;
  };

  return (
    <div
      style={{
        margin: props.margin ? props.margin : "5px",
        flex: props.flex ? props.flex : 1
      }}
      className={dropdownStyle.dropdownContainer}
    >
      <Label label={props.label ? props.label : ""} />
      {
        <div
          onClick={evt => {
            setShow(!show);
          }}
          className={dropdownStyle.dropdownSelectionContainer}
        >
          {selected
            ? selected[props.labelField]
            : props.placeholder
            ? props.placeholder
            : t("common_select_option")}
          <span
            style={{ display: props.hideArrow ? "none" : "block" }}
            className={dropdownStyle.dropdownArrow}
          ></span>
        </div>
      }
      {show ? handleShowList() : null}
    </div>
  );
};

DropdownField.propTypes = {
  options: PropTypes.array.isRequired,
  valueField: PropTypes.string.isRequired,
  labelField: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  hideArrow: PropTypes.bool,
  flex: PropTypes.number,
  name: PropTypes.string.isRequired
};

export default DropdownField;
