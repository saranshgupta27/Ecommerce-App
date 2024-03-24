import { type NextApiRequest, type NextApiResponse } from "next";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: LoginRequestBody = req.body as LoginRequestBody;
  if (email.length > 5 && password.length > 6) {
    const user: User = { id: 1, email: email, name: "Michael" };
    res.status(200).json({ success: true, user });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
}
