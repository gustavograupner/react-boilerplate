import React from 'react';
import PropTypes from 'prop-types';
import cardRowStyles from './cardRow.module.scss';

const CardRow = props => {
	
	const getClassName = () => {
		let classes = cardRowStyles.cardRow + ' ';
		if (props.bordered) {
			classes += cardRowStyles.cardRowBorder + ' ';
		}
		if (props.transparent) {
			classes += cardRowStyles.cardRowTransparent + ' ';
		}
		return classes;
	}

	return (
		<div 
			className={getClassName()}
			style={{
				flex: props.flex ? props.flex : '1',
				padding: props.padding ? props.padding : '0px',
				justifyContent: props.justifyContent ? props.justifyContent : 'space-evenly', 
				flexDirection: props.reverse ? 'row-reverse' : 'row', 
				flexWrap: props.flexWrap ? props.flexWrap : 'wrap',
				alignItems: props.itemAlign ? props.itemAlign : 'unset'
			}}
		>
			{ props.children }
		</div>
	)
}

CardRow.propTypes = {
	flex: PropTypes.number,
	justifyContent: PropTypes.string,
	flexWrap: PropTypes.string,
	itemAlign: PropTypes.string,
	bordered: PropTypes.bool,
	transparent: PropTypes.bool,
	reverse: PropTypes.bool,
	padding: PropTypes.string
}

export default CardRow;