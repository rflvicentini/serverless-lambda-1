module.exports = {
  /**
   * Creates an object literal formatted for use with API Gateway + AWS Lambda callbacks
   *
   * @param  {number} statusCode - the HTTP status code to be returned
   * @param  {(Object|string)} body - The content of the response body
   * @param  {(Boolean|Object)} [cors=true] - CORS setting; can be true|false or an object
   * that defines reponse headers
   * @returns {Object} Object literal formatted for use with AWS Lambda + API Gateway
   */
  create(statusCode, body, cors = true, headers = {}) {
    // TODO: test other JS types
    const bodyString = typeof body === "object" ? JSON.stringify(body) : body;

    /* eslint-disable no-param-reassign */
    if (typeof cors === "object") {
      headers = Object.assign(headers, cors);
    } else if (cors) {
      headers = Object.assign(headers, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      });
    }
    /* eslint-enable no-param-reassign */

    if (headers) {
      return {
        statusCode,
        headers,
        body: bodyString
      };
    } else {
      return {
        statusCode,
        body: bodyString
      };
    }
  },

  /**
   * Creates an object literal formatted for use with API Gateway + AWS Lambda callbacks
   * with an status code of 500
   *
   * @returns {Object} Object literal with 500 status code
   * formatted for use with AWS Lambda + API Gateway
   */
  genericError() {
    return this.create(500, {
      error: {
        message: "server error",
        code: 500
      }
    });
  },

  /**
   * Creates an object literal formatted for use with API Gateway + AWS Lambda callbacks
   * with a custom error message and a status code of 500
   *
   * @param  {Object} message - custom error message
   * @returns {Object} Object literal with 500 status code
   * formatted for use with AWS Lambda + API Gateway
   */
  serverErrorWithMessage(message) {
    return this.create(500, {
      error: {
        message,
        code: 500
      }
    });
  },

  /**
   * Creates an object literal formatted for use with API Gateway + AWS Lambda callbacks
   * with an status code of 401
   *
   * @returns {Object} Object literal with 500 status code
   * formatted for use with AWS Lambda + API Gateway
   */
  unauthorizedError() {
    return this.create(401, {
      error: {
        message: "unauthorized",
        code: 401
      }
    });
  },

  /**
   * Creates and object literal formatted for use with API Gateway + AWS Lambda callbacks
   * with an status code of 400
   *
   * @param  {Object} error - request validation error object
   * @param  {Number} code - domain-specific error codes (see lib/errorCodes.js module)
   * @returns {Object} Object literal with 400 status code
   * formatted for use with AWS Lambda + API Gateway
   */
  validationError(error, code = 400) {
    let details = "";
    if (error.details) {
      details = error.details.reduce((acc, val) => acc + val, details);
    }
    let message =
      details === "" ? error.message : `${error.message}: ${details}`;
    message = message.trim();
    return this.create(code, {
      error: {
        message,
        code
      }
    });
  },

  /**
   * Creates an object literal formatted for use with API Gateway + AWS Lambda callbacks
   * with a custom status code of
   *
   * @returns {Object} Object literal with status code
   * formatted for use with AWS Lambda + API Gateway
   */
  customError(message) {
    return this.create(message.statusCode, {
      error: {
        message: message.payload.message,
        code: message.statusCode
      }
    });
  }
};
