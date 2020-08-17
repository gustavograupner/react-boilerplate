import React from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import Label from "../label/Label";
import datePickerStyle from "./datePickerField.module.scss";
import { Calendar, X } from "react-feather";

const DatePickerField = props => {
  const handleChangeDateTimePicker = event => {
    if (props.onChange) {
      props.onChange(props.name, event);
    }
  };

  return (
    <div style={{ margin: 5, flex: "1 1" }}>
      <div className={datePickerStyle.datePickerContainer}>
        <Label label={props.label} />
        <DateTimePicker
          onChange={handleChangeDateTimePicker}
          value={props.value ? new Date(Date.parse(props.value)) : null}
          disableClock
          calendarIcon={<Calendar size={20} />}
          clearIcon={<X size={20} />}
          format={props.format ? props.format : "dd-MMM-yyyy HH:mm"}
          //locale="en"
          className={datePickerStyle.datePickerWrapper}
          calendarClassName={datePickerStyle.datePickerBottom}
        />
      </div>
    </div>
  );
};

DatePickerField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DatePickerField;
