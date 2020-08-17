import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import paginationTableStyle from './paginationTable.module.scss';
import { DropdownField } from '../';
import { useTranslation } from 'react-i18next';
import {
  ChevronRight,
  ChevronLeft 
} from 'react-feather';

const PaginationTable = props => {

	const { t } = useTranslation();
	
	const goToPage = useCallback(
		(selectedPage) => () => {
			props.goToPage(selectedPage);
		}, []
	);
	
	const pageButton1 = () => {
		if (props.selectedPage - 2 > 0) {
			return (
				<div onClick={goToPage(props.selectedPage - 2)}> 
					{props.selectedPage - 2}
				</div>
			);
		}
		return null;
	}
	
	const pageButton2 = () => {
		if (props.selectedPage - 1 > 0) {
			return (
				<div onClick={goToPage(props.selectedPage - 1)}> 
					{props.selectedPage - 1}
				</div>
			);
		}
		return null;
	} 
	
	const pageButton3 = () => {
		if ((props.selectedPage * props.rowsPerPage) < props.totalRows) {
			return (
				<div onClick={goToPage(props.selectedPage + 1) }>
					{props.selectedPage + 1}
				</div>
			);
		}
		return null;
	}
	
	const pageButton4 = () => {
		if (((props.selectedPage + 1) * props.rowsPerPage) < props.totalRows) {
			return (
				<div onClick={goToPage(props.selectedPage + 2) }>
					{props.selectedPage + 2}
				</div>
			);
		}
		return null;
	}
	
	const renderPagination = () => {
		return (
			<div>
				{
					props.setRowsPerPage 
					?
						<div className={paginationTableStyle.pageRows}>
							<DropdownField
								name="pages"
								options={[
									{int_page: 5, str_name: '5 ' + t('common_per_page')},
									{int_page: 10, str_name: '10 ' + t('common_per_page')},
									{int_page: 15, str_name: '15 ' + t('common_per_page')},
									{int_page: 20, str_name: '20 ' + t('common_per_page')},
									{int_page: 40, str_name: '40 ' + t('common_per_page')},
									{int_page: 80, str_name: '80 ' + t('common_per_page')},
									{int_page: 160, str_name: '160 ' + t('common_per_page')}
								]}
								valueField="int_page"
								labelField="str_name"
								margin="-5px 0px 0px 0px"
								value={props.rowsPerPage}
								hideArrow={true}
								onChange={ (evt, value) => {props.setRowsPerPage(value)}}
							/>
						</div>
					: null
				}
				<div className={paginationTableStyle.paginationContainer}>
					<div className={paginationTableStyle.pagination}>
						<div>
							<ChevronLeft 
								onClick={goToPage((props.selectedPage - 1) > 0 ? props.selectedPage - 1 : props.selectedPage) }
							/>
						</div>
						{ pageButton1() }
						{ pageButton2() }
						<div className={paginationTableStyle.selected}>{props.selectedPage}</div>
						{ pageButton3() }
						{ pageButton4() }
						<div>
							<ChevronRight
								onClick={goToPage((props.selectedPage * props.rowsPerPage) < props.totalRows ? props.selectedPage + 1 : props.selectedPage) }
							/>
						</div>
					</div>
				</div>
			</div>
		)
  }
	
	return (
		renderPagination()
	)
}

PaginationTable.propTypes = {
  totalRows: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	selectedPage: PropTypes.number.isRequired, 
	goToPage: PropTypes.func.isRequired,
	setRowsPerPage: PropTypes.func
}

export default PaginationTable;