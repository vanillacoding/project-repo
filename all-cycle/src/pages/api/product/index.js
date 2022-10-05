import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export default async (req, res) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const productList = await Product.find().sort("-recycleScoreAvg");

        res.status(200).json({
          result: true,
          data: productList,
        });
      } catch (err) {
        res.json({
          result: false,
          error: err.message,
        });
      }
      break;
    case "PUT": {
      try {
        const { body: list } = req;

        list.forEach(async (product) => {
          await Product.findOneAndUpdate(
            { _id: product._id },
            { $set: { ...product } },
            { new: true },
          );
        });

        res.status(200).json({
          result: true,
          data: "ok",
        });
      } catch (err) {
        res.json({
          result: false,
          error: err.message,
        });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
