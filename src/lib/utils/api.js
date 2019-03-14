import axios from 'axios';

export const callApi = async (methodType, url, credentials) => {
  try {
    const response = await axios({
      method: methodType,
      baseURL: 'https://express-training.herokuapp.com/api/',
      url,
      data: credentials,
      headers: { Authorization: localStorage.getItem('key') },
    });
    return response;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};
