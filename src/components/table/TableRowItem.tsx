import React from 'react'

type TableRowItemProps = {
	children: React.ReactNode | string | undefined;
}

export const TableRowItem = (props: TableRowItemProps) => {
	const { children } = props;
	return (
		<div className={'table_row__item'}>
			{children}
		</div>
	)
}