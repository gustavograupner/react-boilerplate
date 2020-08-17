import React from 'react';
import PropTypes from 'prop-types';
import labelStyle from './label.module.scss';

const Label = props => {

	const getClassName = () => {
		let classes = '';
		if (props.bold) {
			classes += labelStyle.boldLabel + ' ';
		}
		if (props.neutral) {
			classes += labelStyle.neutralLabel + ' ';
		}
		if (props.capital) {
			classes += labelStyle.capitalLabel + ' ';
		}
		return classes;
	}

	return (
		<label 
			style={{
				fontSize: props.size ? props.size + 'px' : '1em',
				margin: props.margin ? props.margin : '0px'
			}} 
			className={getClassName()}
			onClick={props.onClick}
		>
			{ (props.required ? '*' : '') + (props.label ? props.label : '') }
		</label>
	);
}

Label.propTypes = {
	label: PropTypes.string,
	required: PropTypes.bool,
	bold: PropTypes.bool,
	neutral: PropTypes.bool,
	capital: PropTypes.bool,
	size: PropTypes.number,
	margin: PropTypes.string,
	onClick: PropTypes.func
}

export default Label;