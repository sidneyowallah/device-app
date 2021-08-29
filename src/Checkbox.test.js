import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

const onChangeMock = jest.fn();
const checkboxProps = {
	type: 'checkbox',
	checked: false,
	id: '1',
	name: 'list-checkbox',
	ariaLabel: 'Checkbox',
	onChange: onChangeMock,
};

test('should render checkbox component', () => {
	render(<Checkbox {...checkboxProps} />);
	const checkboxElement = screen.getByTestId('checkbox-test-1');

	expect(checkboxElement).toBeInTheDocument();
	expect(checkboxElement).not.toBeChecked();
});

test('toggle element by selecting checkbox', () => {
	render(<Checkbox {...checkboxProps} />);
	const checkboxElement = screen.getByTestId('checkbox-test-1');

	// Execute the click event of the checkbox
	userEvent.click(checkboxElement);
	expect(checkboxElement).toBeChecked();

	// Execute the click event again
	userEvent.click(checkboxElement);
	expect(checkboxElement).not.toBeChecked();
});

test('executes onchange event when selecting checkbox', () => {
	render(<Checkbox {...checkboxProps} />);
	const checkboxElement = screen.getByTestId('checkbox-test-1');

	// Execute the click event of the checkbox
	userEvent.click(checkboxElement);
	expect(onChangeMock).toHaveBeenCalledTimes(1);
});
