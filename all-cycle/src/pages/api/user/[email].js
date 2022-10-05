import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Review from "@/models/Review";
import Product from "@/models/Product";

export default async (req, res) => {
  await connectDB();

  const { method } = req;
  const { email } = req.query;

  switch (method) {
    case "GET": {
      try {
        const userInfo = await User.findOne({ email })
          .populate({
            path: "reviews",
            model: "Review",
            populate: {
              path: "productId",
              model: "Product",
            },
          });

        return res.json({
          result: true,
          data: userInfo,
        });
      } catch (err) {
        return res.json({
          result: false,
          error: err.message,
        });
      }
    }
    case "POST": {
      try {
        const userInfo = await User.findOneAndUpdate(
          { email },
          { $push: { history: req.body } },
          { new: true },
        );

        return res.json({
          result: true,
          data: userInfo,
        });
      } catch (err) {
        return res.json({
          result: false,
          error: err.message,
        });
      }
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
