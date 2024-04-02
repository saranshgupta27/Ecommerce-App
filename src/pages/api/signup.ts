import { type NextApiRequest, type NextApiResponse } from "next";

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body as SignupRequestBody;
  if ((name.length > 0 && email.length > 5) || password.length < 6) {
    res.status(200).json({
      success: true,
      message: "Signup successful",
      user: { id: 1, email: email, name: name },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
}
