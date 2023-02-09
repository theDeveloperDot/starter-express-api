import express from 'express'
import { changeOfferStatus, createOffer, updateOffer, getSingleOffer, getAllOffers } from '../controllers/offerController.js';
import { getAdminBasedStores } from '../controllers/storeController.js';
import { authoricedAdminAccess, isAdmin } from '../middlewares/authMiddleware.js';
import { ADD_NEW_OFFER, DELETE_OFFER, EDIT_OFFER, VIEW_OFFER } from '../utils/cosntants.js';
const router = express.Router();


router.post('/:offerId', isAdmin, authoricedAdminAccess(VIEW_OFFER), getSingleOffer)
router.post('/all-offers', isAdmin, authoricedAdminAccess(VIEW_OFFER), getAllOffers)
router.post('/admin-based/:adminId', isAdmin, authoricedAdminAccess(VIEW_OFFER), getAdminBasedStores)
router.post('/create/:storeId', isAdmin, authoricedAdminAccess(ADD_NEW_OFFER), createOffer)
router.patch('/status/:offerId', isAdmin, authoricedAdminAccess(DELETE_OFFER), changeOfferStatus)
router.put('/update/:offerId', isAdmin, authoricedAdminAccess(EDIT_OFFER), updateOffer)

export default router;