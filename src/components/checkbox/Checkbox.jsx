import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.module.scss';

const Checkbox = props => {

  const handleOnChangeChecked = (event) => (
    props.onCheck(props.name, event.target.checked)
  )

  return (
    <div className={styles.checkbox}>
      <input 
        className={styles.input}
        type="checkbox" 
        checked={props.checked}
        onChange={handleOnChangeChecked}
      /> 
      <span className={styles.span}>
        {props.label}
      </span>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.any,
  onCheck: PropTypes.func.isRequired,
}

export default Checkbox;