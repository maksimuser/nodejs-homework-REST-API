const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactService');

const getAll = async (req, res, next) => {
  const { id } = req.user;

  try {
    const allContacts = await listContacts(id);
    res.status(200).json({
      status: 'success',
      contacts: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  const { id } = req.user;
  try {
    const contactById = await getContactById(id, req.params);

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
  const { id } = req.user;

  try {
    const newContact = await addContact(id, req.body);

    res.status(201).json({
      status: 'success',
      addContact: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.user;
  try {
    const deletedContact = await removeContact(id, req.params);

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
  const { id } = req.user;

  try {
    const updatedContact = await updateContact(id, req.params, req.body);

    if (!updatedContact) {
      return res.status(404).json({
        message: `Contact with id '${req.params.contactId}' not found!`,
      });
    }
    res.status(200).json({
      status: 'success',
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.user;
  try {
    const updatedContactStatus = await updateStatusContact(
      id,
      req.params,
      req.body,
    );

    if (!updatedContactStatus) {
      return res.status(404).json({
        message: `Contact with id '${req.params.contactId}' not found!`,
      });
    }
    res.status(200).json({
      status: 'success',
      updatedContactStatus,
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
