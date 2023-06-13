
import userSchema from "@utils/mongoSchema/userSchema";
import bcrypt from "bcrypt";

/**
 * To HASH PASSWORD
 * @param password - Normal Text password that is to be hashed
 * @returns Hash - Encrypted (hashed) Value
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10).then((hash) => hash);
}

/**
 * To verify HASH PASSWORD
 * @param email - email received from the client
 * @param password - Normal Text password received from the client
 * @returns {Object} - 'Email & Password' if the email passed is present in DB and Password matches ELSE returns 'false'
 */
async function verifyPassword(email, password) {
  try {
    const encPass = await userSchema
      .findOne({ email: email })
      ?.select("password name");
    const name = encPass.name;
    const hash = encPass.password;
    console.log("hash", hash);
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      return { email, name };
    } else {
      return isMatch;
    }
  } catch (error) {
    throw error;
  }
}

export { hashPassword, verifyPassword };
