const parseHTML = (htmlString) => {
  const $template = document.createElement("template");
  $template.innerHTML = htmlString;

  return $template.content;
};

export default parseHTML;
