const messagePhaserFor = (message) => {
  const validCommandType = { '!선택': true };
  const validCommandContent = [
    { A: true, B: true, C: true, D: true, E: true, F: true, G: true, H: true },
    { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true },
  ];

  if (message[0] !== '!') return;
  const trimmedMessage = message.trim();
  if (trimmedMessage.length > 10) return;
  const splittedMessage = trimmedMessage.split(' ');
  if (splittedMessage.length !== 2) return;
  const [command, content] = splittedMessage;

  if (!content) return;
  if (content.length !== 2) return;
  if (!validCommandType[command]) return;
  const x = content[0].toUpperCase();
  const y = content[1];
  if (!validCommandContent[0][x]) return;
  if (!validCommandContent[1][y]) return;
  return { command, content: `${x}${y}` };
};

export default messagePhaserFor;
