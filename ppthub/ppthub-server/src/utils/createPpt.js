const PPTXGEN = require("pptxgenjs");

const createPpt = async (mergeData) => {
  try {
    const ppt = new PPTXGEN();
    ppt.layout = "LAYOUT_WIDE";

    for (let i = 0; i < mergeData.slides.length; i += 1) {
      const slide = ppt.addSlide();

      for (let y = 0; y < mergeData.slides[i].items.length; y += 1) {
        const slideBase = mergeData.slides[i].items[y];
        const slideContent = mergeData.slides[i].items[y].content;

        const slideContentPosition = {
          x: slideBase.x / 96,
          y: slideBase.y / 96,
          w: slideBase.width / 96,
          h: slideBase.height / 96,
        };

        const slideContentStyle = {
          bold: slideContent.isBold,
          italic: slideContent.isItalic,
          underline: slideContent.isUnderlined,
          fontface: slideContent.fontFace,
          color: slideContent.fontColor,
          fontSize: slideContent.size,
        };

        if (slideBase.type === "image") {
          slide.addImage({
            data: slideContent.src,
            ...slideContentPosition,
          });
        }

        if (slideBase.type === "text") {
          slide.addText(slideContent.value, {
            ...(slideContent.backgroundColor && {
              fill: {
                color: slideContent.backgroundColor,
              },
            }),
            ...slideContentPosition,
            ...slideContentStyle,
          });
        }
      }
    }
    const pptFile = await ppt.write("base64");

    return pptFile;
  } catch (error) {
    return new Error(error);
  }
};

module.exports = createPpt;
