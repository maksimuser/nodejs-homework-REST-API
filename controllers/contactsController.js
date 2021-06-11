const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../model');

const getAll = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.status(200).json({
      status: 'success',
      contacts: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params);
    if (contactById) {
      res.status(200).json({
        status: 'success',
        contact: contactById,
      });
    } else {
      return next(
        res.status(404).json({
          status: 'fail',
          message: `Contact with id '${req.params.contactId}' not found!`,
        }),
      );
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      addContact: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params);

    if (deletedContact) {
      res.status(200).json({
        status: 'success',
        message: `Contact ${deletedContact.name} deleted`,
      });
    } else {
      return next(
        res.status(404).json({
          status: 'fail',
          message: `Contact with id '${req.params.contactId}' not found!`,
        }),
      );
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const contact = await updateContact(req.params, req.body);

    const getId = contacts.find(el => el.id == req.params.contactId);

    if (getId) {
      res.status(200).json({
        status: 'success',
        updatedContact: contact,
      });
    } else {
      return next(res.status(404).json({ message: 'Not found' }));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getContact, create, remove, update };
