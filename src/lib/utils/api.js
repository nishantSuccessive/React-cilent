import axios from 'axios';

export const callApi = async (methodType, url, credentials) => {
  try {
    const response = await axios({
      method: methodType,
      url: `https://express-training.herokuapp.com/api/${url}`,
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
