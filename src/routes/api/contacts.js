const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateStatusContact,
} = require('../../middleware');

const {
  getAll,
  getContact,
  create,
  remove,
  update,
  updateStatus,
} = require('../../controllers');

router.get('/', getAll);
router.get('/:contactId', getContact);
router.post('/', validateCreateContact, create);
router.delete('/:contactId', remove);
router.put('/:contactId', validateUpdateContact, update);
router.patch('/:contactId/favorite', validateStatusContact, updateStatus);

module.exports = router;
