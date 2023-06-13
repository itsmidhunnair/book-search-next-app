import dbConnect from "@lib/dbConnect";
import { hashPassword } from "@services/api/userServices/passwordHandling";
import userSchema from "@utils/mongoSchema/userSchema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      dbConnect();
      const { name, email, password } = req.body;
      const encPass = await hashPassword(password);
      const data = await userSchema.create({
        name: name,
        email: email,
        password: encPass,
      });
      res.status(200).json(data);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json("User Already Exist! Please  Login...");
      }
      res.status(400).json(error);
    }
  }
}
