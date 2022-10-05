import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export default async (req, res) => {
  try {
    await connectDB();

    const topScoreProducts = await Product
      .aggregate([{ $sample: { size: 16 } }])
      .sort("-recycleScoreAvg");

    return res.json({
      result: true,
      data: topScoreProducts,
    });
  } catch (err) {
    return res.json({
      result: false,
      error: err.message,
    });
  }
};
