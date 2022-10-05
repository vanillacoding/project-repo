const copyToClipboard = async (textToCopy) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy);
    return;
  }

  const $textArea = document.createElement("textarea");
  $textArea.value = textToCopy;
  $textArea.style.position = "fixed";
  $textArea.style.left = "-1000000px";
  $textArea.style.top = "-1000000px";
  document.body.appendChild($textArea);

  $textArea.focus();
  $textArea.select();

  const result = document.execCommand("copy");

  if (!result) {
    throw new Error("Can't copy text");
  }

  $textArea.remove();
};

export default copyToClipboard;
