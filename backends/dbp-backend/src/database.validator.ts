import { body, ValidationChain } from 'express-validator';

export const AddCustomerValidation: ValidationChain[] = [
  body('id')
    .notEmpty()
    .withMessage('NationalID not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),

  body('name')
    .notEmpty()
    .withMessage('Name not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('lastName')
    .notEmpty()
    .withMessage('LastName not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
];
export const AddAttractionValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Attractions name not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('contactNumber')
    .notEmpty()
    .withMessage('Contact number not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),

  body('price')
    .notEmpty()
    .withMessage('Price not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),
];
export const AddReservationValidation: ValidationChain[] = [
  body('customerID')
    .notEmpty()
    .withMessage('Attractions name not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),

  body('attName')
    .notEmpty()
    .withMessage('Contact number not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),

  body('date')
    .notEmpty()
    .withMessage('Price not given')
    .trim(),
];
export const GroupReservationsValidation: ValidationChain[] = [
  body('customerID')
    .notEmpty()
    .withMessage('Attractions name not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),
];
export const ReservationsByRangeValidation: ValidationChain[] = [
  body('customerID')
    .notEmpty()
    .withMessage('Customer id name not given')
    .trim()
    .isNumeric()
    .withMessage('Incorrect format'),

  body('firstDate')
    .notEmpty()
    .withMessage('First date not given')
    .trim()
    .withMessage('Incorrect format'),

  body('secondDate')
    .notEmpty()
    .withMessage('First date not given')
    .trim()
    .withMessage('Incorrect format')
];
export const GroupByAttractionValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Attractions name not given')
    .trim()
    .isString()
    .withMessage('Incorrect format'),
];
