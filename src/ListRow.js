import React from 'react';
import { Checkbox } from './Checkbox';
import './ListRow.css';
export const ListRow = (props) => {
	return (
		<tr className={`list-row ${props.checked ? 'select-background' : ''}`}>
			<td className="checkbox-cell">
				<Checkbox
					forwardRef={props.myRef}
					type={`checkbox`}
					onChange={props.onChange}
					name={props.name}
					id={props.id}
				/>
			</td>
			<td className="name-cell">{props.name}</td>
			<td className="device-cell">{props.device}</td>
			<td className="path-cell">{props.path}</td>
			<td className="status-cell">
				{props.status === 'available' ? (
					<span className="green-dot"></span>
				) : null}
				<span>{props.status}</span>
			</td>
		</tr>
	);
};
