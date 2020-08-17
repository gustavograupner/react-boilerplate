import React from 'react';
import PropTypes from 'prop-types';
import cardColumnStyles from './cardColumn.module.scss';

const CardColumn = props => {
	
	const getClassName = () => {
		let classes = cardColumnStyles.cardColumn + ' ';
		if (props.bordered) {
			classes += cardColumnStyles.cardColumnBorder + ' ';
		}
		return classes;
	}

	return (
		<div 
			className={getClassName()}
			style={{
				flex: props.flex ? props.flex : '1',
				margin: props.margin ? props.margin : '0',
				padding: props.padding ? props.padding : '10px'
			}}
		>
			{ props.children }
		</div>
	)
}

CardColumn.propTypes = {
	flex: PropTypes.number,
	bordered: PropTypes.bool,
	margin: PropTypes.string,
	padding: PropTypes.string,
	children: PropTypes.object,
}

export default CardColumn;