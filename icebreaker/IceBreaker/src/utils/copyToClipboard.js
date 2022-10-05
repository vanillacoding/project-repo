export const copyToClipboard = (id) => {
  const temp = document.createElement('textarea');
  temp.visible = false;
  document.body.appendChild(temp);
  temp.value = id;
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
};
