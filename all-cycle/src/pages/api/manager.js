import axios from "axios";
import cheerio from "cheerio";

import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";
import scrapOptions from "@/constants/scrapOptions";

export default async (req, res) => {
  await connectDB();

  try {
    const {
      commonUrl,
      urls,
      selector,
      src,
      alt,
      productName,
    } = scrapOptions.CHILSUNG;

    const productList = [];
    let count = 0;

    for (let i = 0; i < urls.length; i++) {
      const html = await axios.get(commonUrl + urls[i]);
      const $ = cheerio.load(html.data);

      $(selector).each(function (i, elem) {
        const imgUrl = $(this).find(src.selector).attr(src.attr);
        const imgAlt = $(this).find(alt.selector).attr(alt.attr);
        const name = $(this).find(productName.selector).text();

        productList.push({ imgUrl, imgAlt, name });
      });
    }

    for (let j = 0; j < productList.length; j++) {
      const { imgUrl, imgAlt, name } = productList[j];

      const product = await Product.findOne({ name });

      if (!product && imgUrl) {
        await Product.create({
          name,
          imgUrl,
          imgAlt,
        });

        count++;
      }
    }

    res.json({
      result: true,
      data: count,
    });
  } catch (err) {
    res.json({
      result: false,
      error: err.message,
    });
  }
};
