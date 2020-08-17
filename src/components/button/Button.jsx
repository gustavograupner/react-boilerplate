import React from 'react';
import PropTypes from 'prop-types';
import buttonStyle from './button.module.scss';

const Button = props => {
	
	const getClassName = () => {
		let classes = buttonStyle.button + ' ';
		if (props.confirm) {
			classes += buttonStyle.confirmButton + ' ';
		} 
		if (props.neutral) {
			classes += buttonStyle.neutralButton + ' ';
		} 
		if (props.remove) {
			classes += buttonStyle.removeButton + ' ';
		} 
		if (props.round) {
			classes += buttonStyle.roundButton + ' ';
		}
		if (props.disabled) {
			classes += buttonStyle.disabledButton + ' ';
		}
		return classes;
	}
	
	return (
		<button 
			className={getClassName()} 
			onClick={props.disabled ? null : props.onClick}
			style={{
				margin: props.margin ? props.margin : '0',
				position: props.position ? props.position : 'relative',
				zIndex: 1
			}}
		>
			{ props.label }
		</button>
	);
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	confirm: PropTypes.bool,
	neutral: PropTypes.bool,
	disabled: PropTypes.bool,
	round: PropTypes.bool,
	remove: PropTypes.bool,
	margin: PropTypes.string,
	position: PropTypes.string,
}

export default Button