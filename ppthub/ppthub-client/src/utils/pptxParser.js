import JSZip from "jszip";
import PPT_COLORS from "../config/pptColors";

const parser = new DOMParser();
const EMUFactor = 96 / 914400;
const itemTypes = {
  "p:sp": "text",
  "p:pic": "image",
};

const getSlideSize = async (pptx) => {
  const presentationTextXml = await pptx
    .file("ppt/presentation.xml")
    .async("text");
  const slideSizeXml = parser
    .parseFromString(presentationTextXml, "application/xml")
    .querySelector("sldSz");
  const {
    cx: { nodeValue: slideXSize },
    cy: { nodeValue: slideYSize },
  } = slideSizeXml.attributes;

  return {
    slideWidth: slideXSize * EMUFactor,
    slideHeight: slideYSize * EMUFactor,
  };
};

const getSlidePaths = async (pptx) => {
  const contentTypes = await pptx.file("[Content_Types].xml").async("text");
  const slideOverrides = parser
    .parseFromString(contentTypes, "application/xml")
    .querySelectorAll("Override");

  return Array.from(slideOverrides)
    .filter((el) =>
      el.attributes.PartName.nodeValue.includes("/ppt/slides/slide"),
    )
    .map((el) => el.attributes.PartName.nodeValue.slice(1));
};

const getSlideId = async (slide) => {
  const IdListXml = slide.querySelectorAll("cSld extLst");
  const slideIdXml = Array.from(IdListXml).find(
    ({ nodeName }) => nodeName === "p:extLst",
  );

  if (!slideIdXml) {
    const slideName = slide.querySelector("cSld").attributes.name.nodeValue;
    return slideName;
  }

  const creationId =
    slideIdXml.querySelector("ext creationId").attributes.val.nodeValue;

  return creationId;
};

const getItemId = (item) => {
  const itemName = item.querySelector("cNvPr").attributes.name.nodeValue;

  return itemName;
};

const getItemPresetSize = (item) => {
  const presetType =
    item.querySelector("nvSpPr nvPr ph").attributes.type?.nodeValue;

  switch (presetType) {
    case "ctrTitle":
      return {
        width: 960,
        height: 100,
        x: 160,
        y: 268,
      };
    case "subTitle":
      return {
        width: 960,
        height: 174,
        x: 160,
        y: 378,
      };
    case "title":
      return {
        width: 1104,
        height: 90,
        x: 88,
        y: 88,
      };
    default:
      return {
        width: 1104,
        height: 457,
        x: 88,
        y: 191,
      };
  }
};

const getItemSize = (item) => {
  const itemSizeXml = item.querySelector("xfrm ext");
  const itemPositionXml = item.querySelector("off");

  if (!itemSizeXml) {
    return getItemPresetSize(item);
  }

  const {
    cx: { nodeValue: widthSize },
    cy: { nodeValue: heightSize },
  } = itemSizeXml.attributes;
  const {
    x: { nodeValue: xSize },
    y: { nodeValue: ySize },
  } = itemPositionXml.attributes;

  return {
    width: widthSize * EMUFactor,
    height: heightSize * EMUFactor,
    x: xSize * EMUFactor,
    y: ySize * EMUFactor,
  };
};

const getTextFontColor = (item) => {
  const textAttributeXml = item.querySelector("txBody p r rPr");
  const presetFontXml = textAttributeXml.querySelector("solidFill schemeClr");
  const presetFontColor = presetFontXml?.attributes.val.nodeValue;
  const presetFontDarkness =
    textAttributeXml.querySelector("lumMod")?.attributes.val.nodeValue;

  if (presetFontColor) {
    const darkness = presetFontDarkness ? presetFontDarkness / 1000 : 0;
    return PPT_COLORS[presetFontColor][darkness];
  }

  const customFontColor =
    textAttributeXml.querySelector("solidFill srgbClr")?.attributes.val;

  return customFontColor ? `#${customFontColor.nodeValue}` : "#000000";
};

const getTextAlign = (item) => {
  const textAttributeXml =
    item.querySelector("txBody p pPr")?.attributes.algn?.nodeValue;

  if (textAttributeXml === "ctr") {
    return "center";
  }
  if (textAttributeXml === "r") {
    return "right";
  }

  return "left";
};

const getTextContent = (item) => {
  const value = item.textContent;
  const presetType =
    item.querySelector("nvSpPr nvPr ph")?.attributes.type?.nodeValue;
  const itemName = item.querySelector("cNvPr").attributes.name.nodeValue;
  const textAttributeXml = item.querySelector("txBody p r rPr");
  const { b, i, u, sz } = textAttributeXml.attributes;
  const backgroundColor =
    textAttributeXml.querySelector("highlight srgbClr")?.attributes.val
      .nodeValue;

  const textContent = {
    value,
    isBold: !!b?.nodeValue,
    isItalic: !!i?.nodeValue,
    isUnderlined: !!u?.nodeValue,
    fontColor: getTextFontColor(item),
    backgroundColor: backgroundColor ? `#${backgroundColor}` : null,
  };

  if (itemName.includes("Content Placeholder")) {
    return {
      ...textContent,
      value: `· ${textContent.value}`,
      size: 28,
      align: "left",
    };
  }

  switch (presetType) {
    case "ctrTitle":
      return {
        ...textContent,
        size: 60,
        align: "center",
      };
    case "subTitle":
      return {
        ...textContent,
        size: 24,
        align: "center",
      };
    case "title":
      return {
        ...textContent,
        size: 44,
        align: "left",
      };
    default:
      return {
        ...textContent,
        align: getTextAlign(item),
        size: sz ? sz.nodeValue / 100 : 18,
      };
  }
};

const getImageContent = async (item, slidePath, pptx) => {
  const embedId =
    item.querySelector("blipFill blip").attributes["r:embed"].nodeValue;
  const relsPath = `${slidePath.replace(
    "ppt/slides/",
    "ppt/slides/_rels/",
  )}.rels`;
  const relsXmlText = await pptx.file(relsPath).async("text");
  const relsXmlDOM = parser
    .parseFromString(relsXmlText, "application/xml")
    .querySelector("Relationships").childNodes;
  const embedIdRelXmlDOM = Array.from(relsXmlDOM).find(
    (el) => el.attributes.Id.nodeValue === embedId,
  );
  const imagePath = embedIdRelXmlDOM.attributes.Target.nodeValue;
  const imgSrc = await pptx
    .file(imagePath.replace("..", "ppt"))
    .async("base64");

  return {
    src: `data:image/*;base64,${imgSrc}`,
  };
};

const getItemContent = async (item, itemType, slidePath, pptx) => {
  if (itemType === "text") {
    return getTextContent(item);
  }
  if (itemType === "image") {
    const imageContent = await getImageContent(item, slidePath, pptx);
    return imageContent;
  }

  return undefined;
};

const getSlideItems = async (slide, slidePath, pptx) => {
  const items = Array.from(
    slide.querySelector("sld cSld spTree").children,
  ).slice(2);

  return Promise.all(
    items.map(async (item, index) => {
      const type = itemTypes[item.tagName] ?? "unidentified item";
      const itemId = getItemId(item);
      const { width, height, x, y } = getItemSize(item);
      const content = await getItemContent(item, type, slidePath, pptx);

      return {
        type,
        order: index + 1,
        itemId,
        width,
        height,
        x,
        y,
        content,
      };
    }),
  );
};

const getSlides = async (pptx) => {
  const slidePaths = await getSlidePaths(pptx);

  return Promise.all(
    slidePaths.map(async (path) => {
      const slideTextXml = await pptx.file(path).async("text");
      const slide = parser.parseFromString(slideTextXml, "application/xml");

      const slideId = await getSlideId(slide);
      const items = await getSlideItems(slide, path, pptx);

      return {
        slideId,
        items,
      };
    }),
  );
};

const pptxParser = async (pptxFile) => {
  const pptx = await JSZip.loadAsync(pptxFile);

  const { slideWidth, slideHeight } = await getSlideSize(pptx);
  const slides = await getSlides(pptx);

  return {
    slideWidth,
    slideHeight,
    slides,
  };
};

export default pptxParser;
