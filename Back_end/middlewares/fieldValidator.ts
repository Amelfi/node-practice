import { validationResult, check, body } from "express-validator";
import { Response, Request } from "express";
import { emailExits, isValidEmail, isValidPassword, isValidRole } from "./db-validator";

export const validateUserCreatedField = [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Is not a valid email').isEmail(), // Corregido aquí
    check('email', 'Email already exists').custom(emailExits),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must have more than 6 characters').isLength({ min: 6 }),
    check('confirmedPassword')
        .exists({ checkFalsy: true }).withMessage('You must type a confirmation password')
        .custom((value, { req }) => value === req.body.password).withMessage("The passwords do not match"),
    check('role_id', 'The role is required').not().isEmpty(),
    check('role_id', 'Invalid role').custom(isValidRole),
]

export const validateLoginField = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Is not a valid email').isEmail(),
    check('email', 'Email not found').custom(isValidEmail),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Invalid password').custom((value, { req }) => isValidPassword(req.body.email, value)),
]

export const validateFields = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    return next();
}