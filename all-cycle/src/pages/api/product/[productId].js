import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";
import Review from "@/models/Review";

export default async (req, res) => {
  try {
    await connectDB();

    const { productId } = req.query;
    const product = await Product.findOne({ _id: productId }).populate("reviews");

    return res.json({
      result: true,
      data: product,
    });
  } catch (err) {
    return res.json({
      result: false,
      error: err.message,
    });
  }
};
