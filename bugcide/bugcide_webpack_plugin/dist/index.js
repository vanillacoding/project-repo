const fetch = require("node-fetch");

class BugcidePlugin {
  constructor(options) {
    this.options = options;
    this.serverUrl = 'https://api.bugcide.live';
  }

  apply(compiler) {
    console.log('Bugcide webpack plugin start');
    compiler.hooks.emit.tapAsync('BugcidePlugin', async (compilation, callback) => {

      if (!compilation.errors.length) {
        return callback();
      }

      const errorCollection = compilation.errors.map(err => {
        let targetError = err.error.stack ? err.error : err;

        return {
          name: targetError.name,
          message: targetError.message.split('\n')[0],
          stack: targetError.stack,
          lineno: targetError.loc && targetError.loc.line,
          colno: targetError.loc && targetError.loc.column,
          filename: err.module.resource,
          duplicate_count: 1,
          created_at: new Date()
        };
      });

      const errorList = { errorInfo: errorCollection };

      try {
        const response = await this.sendErrorApi(this.options.projectToken, errorList);

        if (response.result === 'unauthorized') {
          throw new Error('Project Token is invalid!');
        }

        if (response.result !== 'ok' && response.result !== 'not changed') {
          throw new Error('Something went wrong.');
        }
        console.log('Bugcide: error recorded');
      } catch (err) {
        console.log('Bugcide Error: ' + err.message);
      }

      callback();
    });
  }

  sendErrorApi(projectToken, errorList) {
    return fetch(`${this.serverUrl}/project/${projectToken}/error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorList)
    })
      .then(res => res.json());
  }
}

module.exports = BugcidePlugin;
