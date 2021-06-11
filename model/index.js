const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname + '/contacts.json');

// обработка db
const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async ({ contactId }) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    return list.find(el => el.id == contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async ({ contactId }) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const deletedContact = list.find(el => el.id == contactId);
    const updateList = list.filter(el => el.id != contactId);

    fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2), err => {
      if (err) return err.message;
    });

    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const id = nanoid(5);
    const list = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const newContact = { id, ...body };

    fs.writeFile(
      contactsPath,
      JSON.stringify([newContact, ...list], null, 2),
      err => {
        if (err) return err.message;
      },
    );
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async ({ contactId }, body) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    const getContact = list.find(item => item.id == contactId);

    const updatedContact = {
      ...getContact,
      ...body,
    };

    const updatedList = list.map(item => {
      if (item.id == contactId) {
        item = updatedContact;
      }
      return item;
    });

    fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), err => {
      if (err) return err.message;
    });

    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
