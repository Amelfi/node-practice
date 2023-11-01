import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, restoreUserById } from '../controllers/user.controller';
import { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth';
import { validateUserCreatedField, validateFields } from '../middlewares/fieldValidator';

const router = Router();

router.get('/users', checkAuth, getAllUsers);
router.get('/users/:id', checkAuth, getUserById);
router.post('/users', [checkAuth, ...validateUserCreatedField, validateFields], createUser);
router.post('/users/restore/:id', checkAuth, restoreUserById);
router.delete('/users/:id', checkAuth, deleteUserById);
router.patch('/users/:id', checkAuth, updateUserById);

export default router;