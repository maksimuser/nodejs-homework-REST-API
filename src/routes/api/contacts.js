const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateStatusContact,
} = require('../../middleware/validationContacts');

const authMiddleware = require('../../middleware/authMiddleware');

const {
  getAll,
  getContact,
  create,
  update,
  remove,
  updateStatus,
} = require('../../controllers/contactsController');

router.use(authMiddleware);

router.get('/', getAll);
router.get('/:contactId', getContact);
router.post('/', validateCreateContact, create);
router.delete('/:contactId', remove);
router.put('/:contactId', validateUpdateContact, update);
router.patch('/:contactId/favorite', validateStatusContact, updateStatus);

module.exports = router;
