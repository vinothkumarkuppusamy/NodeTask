import * as CryptoJS from "crypto-js";

const SALT = CryptoJS.lib.WordArray.random(128 / 8).toString();

export const hashingPassword = async (user_password: string) => {
  // Generate a unique salt for each password
  const saltWordArray = CryptoJS.enc.Hex.parse(SALT);
  // Hash the password with the generated salt
  const hashPassword = CryptoJS.PBKDF2(user_password, saltWordArray, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();

  // Store both the salt and hash together, separated by a colon
  return `${SALT}:${hashPassword}`;
};

export const comparePassword = async (
  storedPass: string,
  user_pass: string
) => {
  // Split the stored password into salt and hash parts
  const [salt, dbHash] = storedPass.split(":");

  // Parse the salt and hash the incoming password with it
  const saltWordArray = CryptoJS.enc.Hex.parse(salt);
  const hashPassword = CryptoJS.PBKDF2(user_pass, saltWordArray, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
  // Compare the newly hashed password with the stored hash
  return hashPassword === dbHash;
};
