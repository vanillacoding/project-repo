import { getSession } from "next-auth/client";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import Review from "@/models/Review";

export default async (req, res) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "POST": {
      const session = await getSession({ req });

      if (!session) {
        return res.json({
          result: false,
          error: "Unauthorized user",
        });
      }

      const { name, email } = session.user;

      const {
        productId,
        comment,
        picture,
        recycleScore,
        preferenceScore,
      } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          result: false,
          error: "로그인을 하세요",
        });
      }

      const review = await Review.create({
        userId: user._id,
        username: name,
        productId,
        comment,
        picture,
        recycleScore,
        preferenceScore,
      });

      user.reviews.push(review._id);
      await user.save();

      const product = await Product.findById(productId);
      const newRecycleScore = (Number(recycleScore) + product.recycleScoreAvg) / 2;
      const newPreferenceScore = (Number(preferenceScore) + product.preferenceScoreAvg) / 2;

      const parsedRecycleScore = Number.parseFloat(newRecycleScore).toFixed(1);
      const parsedPreferenceScore = Number.parseFloat(newPreferenceScore).toFixed(1);

      await Product.findOneAndUpdate(
        { _id: productId },
        {
          $push: {
            reviewers: user._id,
            reviews: review._id,
          },
          $set: {
            recycleScoreAvg: parsedRecycleScore,
            preferenceScoreAvg: parsedPreferenceScore,
          },
        },
        { new: true },
      );

      return res.status(200).json({
        result: true,
        data: review,
      });
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
