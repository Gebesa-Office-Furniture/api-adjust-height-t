class ValidationService {
  // Validate if a value is null, empty, or undefined
  static isNullEmptyOrUndefined(value) {
    return !value;
  }

  // Validate if a string is a valid non-empty, non-null string
  static isValidString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  // Validate if the value is a number
  static isValidNumber(value) {
    return !isNaN(value);
  }

  // Validate if the value is a valid email
  static isValidEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  // Validate if the value is a valid phone number (optional: add a more specific regex)
  static isValidPhoneNumber(value) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 standard for phone numbers
    return phoneRegex.test(value);
  }

  // Validate if the length of a string is within a range
  static isValidLength(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
  }

  // Validate if the password meets minimum security requirements
  static isValidPassword(value) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, one letter, and one number
    return passwordRegex.test(value);
  }

  // Validate if the value is a boolean (true or false)
  static isValidBoolean(value) {
    return typeof value === "boolean";
  }

  // Validate that the value is a non-empty array
  static isValidArray(value) {
    return Array.isArray(value) && value.length > 0;
  }

  // for debugging
  static isDebuggin(value) {
    console.log(value)
    throw new Error("debug")
  }

  static verifyConfig (config,from) {
    for (const [key, value] of Object.entries(config)) {
      if (!value) {
        console.error(`Error: ${key} is not defined in the environment variables.`);
        process.exit(1); // Detiene la ejecución del programa si falta alguna variable de entorno
      }
    }
    console.log(`All required ${from} environment variables are defined.`);
  };
}

module.exports = ValidationService;
