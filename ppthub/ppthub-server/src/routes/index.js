const express = require("express");
const createError = require("http-errors");

const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");
const uploadPpt = require("../services/pptService");
const createPpt = require("../utils/createPpt");
const differ = require("../utils/differ");
const { getMergedPpt, getSortedSlides } = require("../utils/merge");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ result: "Success" });
});

router.post("/ppts/save", async (req, res, next) => {
  try {
    const { pptData, fileName } = req.body;
    const ppt = new Ppt({
      fileName,
      slideWidth: pptData.slideWidth,
      slideHeight: pptData.slideHeight,
    });
    await ppt.save();

    pptData.slides.forEach(async (slideData) => {
      const slide = await PptSlide.create({ data: slideData });
      await Ppt.findByIdAndUpdate(ppt._id, { $push: { slides: slide._id } });
    });

    res.status(200).json(ppt._id);
  } catch {
    next(createError(500));
  }
});

router.post("/ppts/compare", async (req, res, next) => {
  try {
    const { originalPptId, comparablePptId } = req.body;
    const originalPpt = await Ppt.findById(originalPptId)
      .populate("slides")
      .lean();
    const comparablePpt = await Ppt.findById(comparablePptId)
      .populate("slides")
      .lean();

    if (!originalPpt || !comparablePpt) {
      next(createError(500));
    }

    const diffData = differ(originalPpt, comparablePpt);

    res.status(200).json(diffData);
  } catch {
    next(createError(500));
  }
});

router.post("/ppts/merge", async (req, res, next) => {
  try {
    const { originalPptId, comparablePptId, mergeData, slideOrderList } =
      req.body;
    const originalPpt = await Ppt.findById(originalPptId)
      .populate("slides")
      .lean();
    const comparablePpt = await Ppt.findById(comparablePptId)
      .populate("slides")
      .lean();
    const mergedPptData = getMergedPpt(
      originalPpt,
      comparablePpt,
      mergeData,
      slideOrderList,
    );
    const createdPpt = await createPpt(mergedPptData);
    const downloadUrl = await uploadPpt(createdPpt, mergedPptData.fileName);
    const ppt = new Ppt({
      slideWidth: mergedPptData.slideWidth,
      slideHeight: mergedPptData.slideHeight,
      fileName: mergedPptData.fileName,
      downloadUrl,
      slideOrderList,
    });
    await ppt.save();

    mergedPptData.slides.forEach(async (slideData) => {
      const slide = await PptSlide.create({ data: slideData });
      await Ppt.findByIdAndUpdate(ppt._id, { $push: { slides: slide._id } });
    });

    res.status(200).json(ppt._id);
  } catch {
    next(createError(500));
  }
});

router.get("/:ppt_id/download", async (req, res, next) => {
  try {
    const { mergedPptId } = req.query;
    const mergedPpt = await Ppt.findById(mergedPptId).populate("slides").lean();
    const slides = mergedPpt.slides.map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });
    const sortedSlides = getSortedSlides(slides, mergedPpt.slideOrderList);
    mergedPpt.slides = sortedSlides;

    res.status(200).json(mergedPpt);
  } catch {
    next(createError(500));
  }
});

module.exports = router;
