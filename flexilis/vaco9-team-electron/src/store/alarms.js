const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    this.path = path.join(userDataPath, opts.configName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  get() {
    this.data = parseDataFile(this.path);
    return this.data.alarms;
  }

  set(time, bodyPart, customVideo) {
    this.data.alarms.push({ time, bodyPart, customVideo });

    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  delete(time) {
    this.data.alarms = this.data.alarms.filter((alarm) => {
      return alarm.time !== time;
    });

    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}

module.exports = Store;
