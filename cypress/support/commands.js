Cypress.Commands.add('uploadFile', ({ file, input }) => {
	cy.get(input).selectFile(`cypress/fixtures/${file}`);
});

Cypress.Commands.add('dragAndDropFile', ({ file, input }) => {
	cy.get(input).selectFile(`cypress/fixtures/${file}`, { action: 'drag-drop' });
});