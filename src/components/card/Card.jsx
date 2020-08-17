import React from 'react';
import PropTypes from 'prop-types';
import cardStyles from './card.module.scss';

const Card = props => {

	const getClassName = () => {
		let classes = cardStyles.card + ' ';
		if (props.bordered) {
			classes += cardStyles.cardBorder + ' ';
		}
		if (!props.transparent) {
			classes += cardStyles.cardBackground + ' ';
		}
		return classes;
	}

	return (
		<div 
			className={getClassName()}
			style={{
				flex: props.flex ? props.flex : '1',
				minHeight: props.fullSize ? 'calc(100% - 140px)' : '',
				margin: props.margin ? props.margin : '0'
			}}
		>
			{ props.children }
		</div>
	)
}

Card.propTypes = {
	flex: PropTypes.number,
	fullSize: PropTypes.bool,
	bordered: PropTypes.bool,
	transparent: PropTypes.bool,
	margin: PropTypes.string
}

export default Card;