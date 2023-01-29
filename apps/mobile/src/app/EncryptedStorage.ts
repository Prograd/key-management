import EncryptedStorage from 'react-native-encrypted-storage';

const set = async (key: string, value: string) => {
  try {
    console.log('saving data', key, value);
    await EncryptedStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.log('error saving data', e);
    return false;
  }
};

const get = async (key: string) => {
  try {
    const value = await EncryptedStorage.getItem(key);
    if (value === undefined) console.log('data not saved previously', key);
    return value;
  } catch (e) {
    console.log('error reading data', e);
    return null;
  }
};

const remove = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log('error removing data', e);
    return false;
  }
};

const encryptedStorage = {set, get, remove};

export default encryptedStorage;
