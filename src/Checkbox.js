import React from 'react';
import './Checkbox.css';
export const Checkbox = ({ forwardRef, type, onChange, name, id }) => {
	return (
		<input
			ref={forwardRef}
			type={type}
			onChange={onChange}
			name={name}
			id={id}
		/>
	);
};
