import { getSession } from "next-auth/client";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async (req, res) => {
  await connectDB();

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.json({
        result: false,
        error: "Unauthorized user",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $push: {
          badges: req.body,
        },
      },
      { new: true },
    );

    return res.json({
      result: true,
      data: user,
    });
  } catch (err) {
    return res.json({
      result: false,
      error: err.message,
    });
  }
};
