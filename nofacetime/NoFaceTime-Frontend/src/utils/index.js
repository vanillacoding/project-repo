export const copyRoomInvitationLink = (event) => {
  const linkText = document.createElement('textarea');

  linkText.value = event.target.value;
  event.target.appendChild(linkText);
  linkText.focus();
  linkText.select();

  const isSuccessToCopy = document.execCommand('copy');

  if (isSuccessToCopy) {
    alert('Invitation Link Copy!');
  } else {
    alert('Copy Failure');
  }

  event.target.removeChild(linkText);
};
