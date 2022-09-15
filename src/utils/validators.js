const validateName = (name) => {
  if (!/./.test(name)) return false;
  return true;
};

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  if (/\s/g.test(password)) return false; // Contains whitespace
  if (password.length < 12) return false; // Too short
  if (password.length > 50) return false; // Too long
  if (password.toUpperCase() === password) return false; // Does not contain lowercase 
  if (password.toLowerCase() === password) return false; // Does not contain uppercase
  if (!/\d/.test(password)) return false; // Does not contain number
  if (!/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password)) return false; // Does not contain special char
  return true;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
