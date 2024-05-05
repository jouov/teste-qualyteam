import { fileUploaderPage } from "../pages/fileUploader";

const filesNames = [
    'example.json',
    'docFile.doc',
    'testFile.pdf',
];

const uploadFileToDragAndDropAndCheckContainer = (filesNames) => {
    cy.visit(fileUploaderPage.url);
    
    filesNames.forEach((file) => {
        cy.dragAndDropFile({
            file: file,
            input: fileUploaderPage.dragAndDropFileInput
        });
        cy.wait('@postFile').its('response').then((requestResponse) => {
            expect(requestResponse.statusCode).eq(200);
            expect(requestResponse.body).contain(file);
        });
    });
};

describe('File Upload Tests', () => {
    beforeEach(() => {
        cy.intercept(fileUploaderPage.intercept.postFile).as('postFile');
    });
    
    it('"Choose File" Button Upload Test', () => {
        const successMessage = 'File Uploaded!';

        cy.visit(fileUploaderPage.url);
        cy.uploadFile({
            file: filesNames[0],
            input: fileUploaderPage.chooseFileInput,
        });
        cy.get(fileUploaderPage.submitFileButton).click();
        cy.get(fileUploaderPage.successMessage).should('be.visible').should('contain', successMessage);
        cy.get(fileUploaderPage.uploadedFilesContainer).should('be.visible').should('contain', filesNames[0]);
    });

    it('"Drag And Drop" Area Upload Test', () => {
        uploadFileToDragAndDropAndCheckContainer([filesNames[0]]);
    });

    it('"Upload Multiple Files" Test', () => {
        uploadFileToDragAndDropAndCheckContainer(filesNames);
    });
});