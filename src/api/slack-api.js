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
