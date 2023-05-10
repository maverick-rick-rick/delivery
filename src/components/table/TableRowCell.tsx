import React from 'react'

import classes from "./../../style_modules/table/TableRow.module.css"

type TableRowItemProps = {
	children: React.ReactNode | string | undefined;
	className?: string;
}

export const TableRowCell = (props: TableRowItemProps) => {
	const { children, className } = props;
	return (
		<div className={`${classes.cell} ${className ? className : ""}`}>
			<div className={classes.cell_content}>
				{children}
			</div>
		</div>
	);
}