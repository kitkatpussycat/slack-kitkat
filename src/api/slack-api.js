import axios from "axios";

const API_URL = "https://slackapi.avionschool.com/api/v1";

export const register = async (email, password, passwordConfirmation) => {
  let errors = [];
  const response = await axios
    .post(`${API_URL}/auth`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    .catch((error) => {
      errors = error.response.data.errors.full_messages;
    });
  console.log(response);
  console.log(errors);
  return [response, errors];
};

export const login = async (email, password) => {
  let data;
  let errors = [];
  let headers = {};
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, {
      email,
      password,
    });
    console.log(response);
    data = response.data.data;
    headers["access-token"] = response.headers["access-token"];
    headers["client"] = response.headers["client"];
    headers["expiry"] = response.headers["expiry"];
    headers["uid"] = response.headers["uid"];
  } catch (error) {
    errors = error.response.data.errors.full_messages;
    console.log(errors);
  }

  return { data, errors, headers };
};
//////////////////////////////////////////////////////////////////////////////////////////////Mga kinopya ko
export const createChannel = async (users, channelName, headers) => {
  let status;
  let data = [];
  try {
    const res = await axios.post(
      `${API_URL}/channels`,
      {
        name: channelName,
        user_ids: users.map((user) => user.id),
      },
      {
        headers: {
          ...headers,
        },
      }
    );

    data = res.data;
    status = res.status;
  } catch (error) {
    console.error(error.response);
  }

  return [data, status];
};

export const getChannels = async (headers) => {
  let data = [];
  try {
    const res = await axios.get(`${API_URL}/channels`, {
      headers: {
        ...headers,
      },
    });

    data = res.data.data;
    console.log(data);
  } catch (error) {
    console.error(error.response);
  }

  return data;
};

export const getUsers = async (headers) => {
  let users = [];
  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        ...headers,
      },
    });
    users = res.data.data;
    console.log(users);
  } catch (e) {
    console.log(e.response);
  }

  return users;
};
