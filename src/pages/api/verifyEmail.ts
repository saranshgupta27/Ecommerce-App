import { type NextApiRequest, type NextApiResponse } from "next";

interface VerifyEmailRequestBody {
  email: string;
  verificationCode: string;
  name: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, verificationCode, name }: VerifyEmailRequestBody =
    req.body as VerifyEmailRequestBody;

  if (verificationCode.toString() === "12345678") {
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { email, id: 1, name },
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid verification code" });
  }
}
