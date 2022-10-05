function setTemporaryMessage(message, setter, callback) {
  setter(message);

  setTimeout(() => {
    setter("");

    if (callback) {
      callback();
    }
  }, 1000);
}

export default setTemporaryMessage;
