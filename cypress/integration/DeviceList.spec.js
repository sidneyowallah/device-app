describe('Renders the page', () => {
	it('renders page correctly', () => {
		cy.visit('/');
		cy.get('.list-table').should('exist');
	});

	it('should reflect the count of selected items when one checkbox is selected', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('.select-count').contains('Selected 1');
	});

	it('should reflect the count of selected items when two checkboxes are selected', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-2').click();
		cy.get('.select-count').contains('Selected 2');
	});

	it('should display "None Selected" when no checkboxes are selected', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-2').click();
		cy.get('#checkbox-2').click();
		cy.get('.select-count').contains('None Selected');
	});

	it('Clicking the select-all checkbox should select all items if none are selected.', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-2').click();
		cy.get('#checkbox-2').click();
		cy.get('#checkbox-selectAll').click();
		cy.get('.select-count').contains('Selected 5');
	});

	it('Clicking the select-all checkbox should select all items if some are selected.', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-2').click();
		cy.get('#checkbox-selectAll').click();
		cy.get('.select-count').contains('Selected 5');
	});

	it('Clicking the select-all checkbox should de-select all items if all are currently selected.', () => {
		cy.visit('/');
		cy.get('#checkbox-0').click();
		cy.get('#checkbox-1').click();
		cy.get('#checkbox-2').click();
		cy.get('#checkbox-3').click();
		cy.get('#checkbox-4').click();
		cy.get('.select-count').contains('Selected 5');
		cy.get('#checkbox-selectAll').click();
		cy.get('.select-count').contains('None Selected');
	});

	it('Status should be correctly formatted', () => {
		cy.visit('/');
		cy.get('.green-dot').siblings().contains('available');
	});

	it('Clicking "Download Selected" when no checkbox is selected should generate an alert box with message', () => {
		cy.visit('/');
		cy.get('.download-button').click();
		cy.on('window:alert', (txt) => {
			expect(txt).contains('Please select a file');
		});
	});
});
