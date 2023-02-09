import express from 'express';
import {
    addFeaturesAccess,
    createMiddleware, 
    getAllActions,
    removeFeaturesAccess,
    updateMiddlewareStatus,
    updateName,
    getAllMiddlewares
} from '../controllers/middlewareController.js';
import { authoricedAdminAccess, isAdmin } from '../middlewares/authMiddleware.js';
import {
    CREATE_MIDDLEWARE,
    UPDATE_MIDDLEWARE,
    VIEW_ALL_ACTIONS,
    VIEW_ALL_MIDDLEWARES
} from '../utils/cosntants.js';

const router = express.Router();

router.post('/create', isAdmin, authoricedAdminAccess(CREATE_MIDDLEWARE), createMiddleware)
router.put('/add-features/:middlewareId', isAdmin, authoricedAdminAccess(UPDATE_MIDDLEWARE), addFeaturesAccess)
router.put('/remove-features/:middlewareId', isAdmin, authoricedAdminAccess(UPDATE_MIDDLEWARE), removeFeaturesAccess)
router.put('/update-name/:middlewareId', isAdmin, authoricedAdminAccess(UPDATE_MIDDLEWARE), updateName)
router.patch('/change-status/:middlewareId', isAdmin, authoricedAdminAccess(UPDATE_MIDDLEWARE), updateMiddlewareStatus)
router.post('/view-all-actions', isAdmin, authoricedAdminAccess(VIEW_ALL_ACTIONS), getAllActions)
router.post('/view', isAdmin, authoricedAdminAccess(VIEW_ALL_MIDDLEWARES), getAllMiddlewares)

export default router;