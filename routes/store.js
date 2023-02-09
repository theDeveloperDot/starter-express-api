import express from 'express'
import { createStore, getAllStores, getStore } from '../controllers/storeController.js';
import { authoricedAdminAccess, isAdmin } from '../middlewares/authMiddleware.js';
import { CREATE_STORE, VIEW_STORE } from '../utils/cosntants.js';

const router = express.Router();

router.get('/storeId',isAdmin,authoricedAdminAccess(VIEW_STORE),getStore)
router.post('/create',isAdmin,authoricedAdminAccess(CREATE_STORE),createStore)
router.post('/all-stores',isAdmin,authoricedAdminAccess(VIEW_STORE),getAllStores)

export default router;