import isEqualArray from "../../../utils/isEqualArray";

export default class SkillCommandListener {
  constructor() {
    this.skillCommands = {};
    this.actionsToListen = {};
  }

  addSkillCommand(skillInfo) {
    const { command } = skillInfo;

    if (!this.skillCommands[command.length]) {
      this.skillCommands[command.length] = [];
    }

    this.skillCommands[command.length].push(skillInfo);

    return this;
  }

  handleCommandListen(inputtedCommand) {
    const equalCommandNumSkillInfos =
      this.skillCommands[inputtedCommand.length];

    if (!equalCommandNumSkillInfos) {
      return;
    }

    for (let i = 0; i < equalCommandNumSkillInfos.length; i += 1) {
      const { skill, command } = equalCommandNumSkillInfos[i];

      if (isEqualArray(inputtedCommand, command)) {
        skill();
        break;
      }
    }
  }
}
