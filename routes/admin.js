import express from 'express'
const router = express.Router();
import { adminLogin, changeAdminRole, changeBlockStatus, createAdmin, logout, viewAllAdmins } from '../controllers/adminController.js'
import { authoricedAdminAccess, isAdmin } from '../middlewares/authMiddleware.js';
import { ADD_NEW_ADMIN, BLOCK_ADMIN, CHANGE_ADMIN_STATUS, VIEW_ALL_ADMINS } from '../utils/cosntants.js';

const handler = (req, res, next) => {
    console.log(req.body);
    res.json({ success: true, messase: "" })
}

router.post('/signin', adminLogin)
router.post('/create', isAdmin, authoricedAdminAccess(ADD_NEW_ADMIN), createAdmin)
router.patch('/change-role/:adminId', isAdmin, authoricedAdminAccess(CHANGE_ADMIN_STATUS), changeAdminRole)
router.patch('/change-block-status/:adminId', isAdmin, authoricedAdminAccess(BLOCK_ADMIN), changeBlockStatus)
router.post('/view-all', isAdmin, authoricedAdminAccess(VIEW_ALL_ADMINS), viewAllAdmins)
router.post('/logout',isAdmin,logout)
export default router;

