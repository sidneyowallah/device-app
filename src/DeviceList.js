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
	const [selectDownload, setSelectDownload] = useState([]);

	function onChangeSelectAll(e) {
		selectCheckBox.current.forEach(
			(checkItem) => (checkItem.checked = selectAll.current.checked)
		);

		if (e.target.checked) {
			setSelectCount(deviceData.length);
			setCheckedState(Array(deviceData.length).fill(true));
			setSelectDownload(deviceData);
		} else {
			setSelectCount(0);
			setCheckedState(Array(deviceData.length).fill(false));
			setSelectDownload([]);
		}
	}

	function onChangeCheckBox(e, item) {
		const i = selectCheckBox.current.indexOf(e.target);
		const newState = Array.from(checkedState);
		newState[i] = e.target.checked;
		setCheckedState(newState);

		if (e.target.checked) {
			setSelectCount(selectCount + 1);
			setSelectDownload((selectDownload) => [...selectDownload, item]);
		} else if (!e.target.checked) {
			setSelectCount(selectCount - 1);
			const newDownloadArr = selectDownload.filter(
				(currItem) => currItem !== item
			);
			setSelectDownload(newDownloadArr);
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

	const handleDownload = () => {
		let alertMessage;

		const downloadsAlert = selectDownload.map((d) => {
			if (d.status == 'available') {
				return `${d.device} - ${d.path}`;
			} else {
				return `Sorry ${d.device} is not available for download`;
			}
		});

		if (downloadsAlert.length > 0) {
			alertMessage = downloadsAlert.join('\n');
		} else {
			alertMessage = `Please select a file`;
		}

		alert(alertMessage);
	};

	return (
		<table className="list-table">
			<thead>
				<tr className="select-all-row">
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
						<div className="download-button" onClick={handleDownload}>
							<img src="/images/downloadIconSvg.svg" alt="download icon" />

							<span>Download Selected</span>
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
