import React, { useState, useRef, useEffect } from 'react';
import './DeviceList.css';
import { deviceData } from './deviceData';
import { Checkbox } from './Checkbox';
import { ListRow } from './ListRow';

export const DeviceList = () => {
	const selectAll = useRef(null);
	const selectCheckBox = useRef(deviceData.map(() => null));
	const tableHeaders = Object.keys(deviceData.map((data) => data)[0]);

	const [checkedState, setCheckedState] = useState([]);
	const [selectCount, setSelectCount] = useState(0);
	const [selected, setSelected] = useState([]);

	function onChangeSelectAll(e) {
		selectCheckBox.current.forEach(
			(checkItem) => (checkItem.checked = selectAll.current.checked)
		);

		if (e.target.checked) {
			setSelectCount(deviceData.length);
			setCheckedState(Array(deviceData.length).fill(true));
		} else {
			setSelectCount(0);
			setCheckedState(Array(deviceData.length).fill(false));
		}
	}

	function onChangeCheckBox(e) {
		const i = selectCheckBox.current.indexOf(e.target);
		const newState = Array.from(checkedState);
		newState[i] = e.target.checked;
		setCheckedState(newState);

		if (e.target.checked) {
			setSelected([...selected, e.target.name]);
			setSelectCount(selectCount + 1);
		} else if (!e.target.checked) {
			const newSelectedArr = selected.filter(
				(currItem) => currItem !== e.target.name
			);
			setSelected(newSelectedArr);
			setSelectCount(selectCount - 1);
		}
	}

	function setIndeterminate() {
		let allChecked;
		for (const checkItem of selectCheckBox.current) {
			if (!checkItem) continue;
			const checked = checkItem.checked;
			if (allChecked === undefined) {
				allChecked = checked;
			} else if (allChecked !== checked) {
				allChecked = null;
				break;
			}
		}
		if (typeof allChecked === 'boolean') {
			selectAll.current.checked = allChecked;
			selectAll.current.indeterminate = false;
		} else {
			selectAll.current.indeterminate = true;
		}
	}
	useEffect(setIndeterminate);

	return (
		<table className="list-table">
			<thead>
				<tr>
					<th className="checkbox-cell">
						<Checkbox
							forwardRef={selectAll}
							type={`checkbox`}
							onChange={onChangeSelectAll}
							name={`selectAll`}
							id={`selectAll`}
						/>
					</th>
					<th>
						<p className="select-count">
							{selectCount > 0 ? `Selected ${selectCount}` : 'None Selected'}
						</p>
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
					<ListRow
						key={key}
						name={data.name}
						device={data.device}
						path={data.path}
						status={data.status}
						id={`checkbox-${key}`}
						onChange={(event) => onChangeCheckBox(event, data)}
						myRef={(r) => (selectCheckBox.current[key] = r)}
						checked={checkedState[key]}
					/>
				))}
			</tbody>
		</table>
	);
};
