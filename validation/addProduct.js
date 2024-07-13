const { body } = require('express-validator');

module.exports = [
    // Title validation
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters')
        .isString().withMessage('Title must be a string'),

    // Price validation
    body('price')
        .trim()
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Please enter a valid number')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    // Image URL validation
    body('imageUrl')
        .trim()
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Please enter a valid URL'),

    // Description validation
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 1, max: 255 }).withMessage('Description must be between 1 and 255 characters')
        .isString().withMessage('Description must be a string')
];
