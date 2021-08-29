import React from 'react';
import './Checkbox.css';
export const Checkbox = ({ forwardRef, type, onChange, name, id, checked }) => {
	return (
		<>
			<label htmlFor={type} className="visually-hidden">
				{name}
			</label>
			<input
				ref={forwardRef}
				type={type}
				onChange={onChange}
				name={name}
				id={`checkbox-${id}`}
				defaultChecked={checked}
				aria-labelledby={name}
				aria-checked={checked}
				role={type}
				data-testid={`checkbox-test-${id}`}
			/>
		</>
	);
};
