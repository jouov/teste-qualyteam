const fileUploader = {
    url: 'https://the-internet.herokuapp.com/upload',
    intercept: {
        postFile: ({
            method: 'POST',
            url: 'https://the-internet.herokuapp.com/upload',
        }),
    },
    chooseFileInput: '#file-upload',
    submitFileButton: '#file-submit',
    successMessage: '#content .example h3',
    uploadedFilesContainer: '#uploaded-files',
    dragAndDropFileInput: '#drag-drop-upload',
    dragAndDropUploadedFilesContainer: '.dz-filename', 
};

export { fileUploader };