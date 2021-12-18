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

  console.log(`regiter response:${response}`);
  console.log(`register errors:${errors}`);

  return [response, errors];
};

export const login = async (email, password) => {
  let errors = [];
  const response = await axios
    .post(`${API_URL}/auth/sign_in`, {
      email,
      password,
    })
    .catch((error) => {
      errors = error.response.data.errors.full_messages;
    });

  console.log(`log-in response:${response}`);
  console.log(`log-in errors:${errors}`);

  return [response, errors];
};
