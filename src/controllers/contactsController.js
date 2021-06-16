const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
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

    if (!contactById) {
      return res.status(404).json({
        status: 'fail',
        message: `Contact with id '${req.params.contactId}' not found!`,
      });
    }

    res.status(200).json({
      status: 'success',
      contact: contactById,
    });
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

    if (!deletedContact) {
      return res.status(404).json({
        status: 'fail',
        message: `Contact with id '${req.params.contactId}' not found!`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: `Contact ${deletedContact.name} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const contact = await updateContact(req.params, req.body);

    const getId = contacts.find(el => el.id == req.params.contactId);

    if (!getId) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({
      status: 'success',
      updatedContact: contact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const contactStatus = await updateStatusContact(req.params, req.body);

    const getId = contacts.find(el => el.id == req.params.contactId);

    if (!getId) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({
      status: 'success',
      updatedStatus: contactStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getContact,
  create,
  remove,
  update,
  updateStatus,
};
