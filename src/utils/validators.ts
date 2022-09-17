export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateFirstName = (firstName: string) => {
  return String(firstName)
    .toLowerCase()
    .match(/^[A-Za-z]+(([,.] |[ '-])[A-Za-z]+)*([.,'-]?)$/);
};

export const validateUserName = (username: string) => {
  return String(username)
    .toLowerCase()
    .match(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/);
};

export const loginValidatePassword = (password: string) => {
  return password.length !== 0;
};

// export const validatePassword = (password: string) => {
//   return String(password)
//     .toLowerCase()
//     .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
// };

export const validatePassword = (password: string) => {
  return password.trim().length >= 6;
};
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export const errorMessages = {
  emailMessage: 'Please, Enter a valid Email',
  firstNameMessage: 'Please, Enter Your Name',
  userNameMessage:
    'username must be more than 6 characters and less than 18 characters \n and contain only letters, numbers,\n and underscores and no spaces',
  loginPasswordMessage: 'Please Enter Your Password',
  // passwordMessage:
  //   'Password length must be at least 9 characters, \n contain digit, lower case, upper case and special character',
  passwordMessage: 'Password length must be at least 6 characters',
  confirmPasswordMessage: 'Passwords Must be the same',
};
