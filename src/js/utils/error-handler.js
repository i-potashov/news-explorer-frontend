const {USER_NOT_FOUND, SERVER_ERROR, NOT_UNIQUE} = require('../constants/errors');

const errorHandler = (err) => {
  switch (err) {
    case '401':
      return USER_NOT_FOUND;
    case '500':
      return SERVER_ERROR;
    case '409':
      return NOT_UNIQUE;
    default:
      return 'test';
  }
};

module.exports = {
  errorHandler,
};
