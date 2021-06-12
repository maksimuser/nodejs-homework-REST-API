const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validatePatchContact,
} = require('../../middleware');
const {
  getAll,
  getContact,
  create,
  remove,
  update,
} = require('../../controllers');

router.get('/', getAll);
router.get('/:contactId', getContact);
router.post('/', validateCreateContact, create);
router.delete('/:contactId', remove);
router.put('/:contactId', validatePatchContact, update);

module.exports = router;
