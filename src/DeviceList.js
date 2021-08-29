import React, { useState, useRef } from 'react';
import './DeviceList.css';
import { deviceData } from './deviceData';

export const DeviceList = () => {
	const selectAll = useRef(null);
	const selectCheckBox = useRef(deviceData.map(() => null));

	const [checkedState, setCheckedState] = useState([]);

	function onChangeSelectAll() {
		selectCheckBox.current.forEach(
			(checkItem) => (checkItem.checked = selectAll.current.checked)
		);
	}

	function onChangeCheckBox(e) {
		const i = selectCheckBox.current.indexOf(e.target);
		const newState = Array.from(checkedState);
		newState[i] = e.target.checked;
		console.log('initial', checkedState);
		setCheckedState(newState);
		console.log('after', checkedState);
	}

	const tableHeaders = Object.keys(deviceData.map((data) => data)[0]);

	return (
		<table className="list-table">
			<thead>
				<tr>
					<th className="checkbox-cell">
						<input
							ref={selectAll}
							type="checkbox"
							onChange={onChangeSelectAll}
							name={`selectAll`}
							id={`selectAll`}
						/>
					</th>
					<th>
						<p className="select-count">count</p>
					</th>
					<th>
						<div>
							<p>Download Selected</p>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td>
					{tableHeaders.map((header, key) => (
						<td className="header-row" key={key}>
							{header}
						</td>
					))}
				</tr>
				{deviceData.map((data, key) => (
					<tr key={key} className="list-row">
						<td className="checkbox-cell">
							<input
								ref={(r) => (selectCheckBox.current[key] = r)}
								type="checkbox"
								onChange={(event) => onChangeCheckBox(event, data)}
								checked={checkedState[key]}
								name={data.name}
							/>
						</td>
						<td className="name-cell">{data.name}</td>
						<td className="device-cell">{data.device}</td>
						<td className="path-cell">{data.path}</td>
						<td className="status-cell">{data.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
