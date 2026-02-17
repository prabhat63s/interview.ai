export const validatePDF = (file: File) => {
    if (file.type !== 'application/pdf') {
        throw new Error('Invalid file type. Please upload a PDF.');
    }
    if (file.size > 5 * 1024 * 1024) {
        throw new Error('File too large. Maximum size is 5MB.');
    }
    return true;
};
