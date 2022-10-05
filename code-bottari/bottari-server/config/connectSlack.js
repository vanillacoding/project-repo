/* eslint-disable no-console */
const { App } = require("@slack/bolt");
const createError = require("http-errors");

const SlackToken = require("../models/SlackToken");

const modalTemplate = require("./modal.json");

const {
  SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN,
} = require("./envConfig");

const PYTHON = "python";
const JAVA = "java";
const JAVASCRIPT = "javascript";
const CSS = "css";
const C = "c";
const CPP = "cpp";
const CSHARP = "csharp";
const PHP = "php";
const R = "r";
const OBJECTIVE_C = "objc";
const NOT_IN_CHANNEL = "not_in_channel";
const REQUEST_ADDING_TO_CHANNEL = "이 채널에 저를 추가해 주세요!😵";

const app = new App({
  signingSecret: SLACK_SIGNING_SECRET,
  token: SLACK_BOT_TOKEN,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();

const changeType = (language) => {
  const filetypes = {
    Python: PYTHON,
    Java: JAVA,
    JavaScript: JAVASCRIPT,
    CSS: CSS,
    C: C,
    "C++": CPP,
    "C#": CSHARP,
    PHP: PHP,
    R: R,
    "Objective-C": OBJECTIVE_C,
  };

  const filetype = filetypes[language];

  return filetype;
};

(function () {
  const channelStorage = {};
  const snippetStorage = {};

  app.command("/code", async ({ ack, body, client, logger }) => {
    await ack();

    const {
      channel_id: channelId,
      trigger_id: triggerId,
    } = body;

    try {
      const result = await client.views.open({
        trigger_id: triggerId,
        view: {
          type: "modal",
          callback_id: "codeModal",
          ...modalTemplate,
        }
      });

      const { id: viewId } = result.view;

      channelStorage[viewId] = channelId;
    } catch (error) {
      logger.error(error);
    }
  });

  app.view("codeModal", async ({ ack, body, view, client, logger }) => {
    await ack();

    const name = view.state.values.title.input.value;
    const message = view.state.values.message.input.value;
    const language = view.state.values.language.select.selected_option.text.text;
    const code = view.state.values.snippet.input.value;

    const { id: viewId } = view;
    const channelId = channelStorage[viewId];

    const filetype = changeType(language);

    const { id: teamId } = body.team;
    let accessToken = "";

    try {
      const slackToken = await SlackToken.findOne({ teamId });

      accessToken = slackToken.accessToken;

      const result = await client.files.upload({
        token: accessToken,
        channels: channelId,
        initial_comment: message,
        filename: name,
        title: name,
        content: code,
        filetype,
      });

      delete channelStorage[viewId];

      console.log(result);
    } catch (error) {
      const { error: message } = error.data;

      if (message === NOT_IN_CHANNEL) {
        await app.client.chat.postMessage({
          token: accessToken,
          channel: channelId,
          text: REQUEST_ADDING_TO_CHANNEL,
        });

        return;
      }

      logger.error(error);
    }
  });

  app.event("app_uninstalled", async ({ body }) => {
    const { team_id: teamId } = body;

    try {
      await SlackToken.deleteOne({ teamId });
    } catch (error) {
      console.log(error);
    }
  });

  app.command("/share", async ({ ack, body, client, logger }) => {
    await ack();

    const { text: nickname, team_id: teamId, channel_id: channelId } = body;

    let accessToken = "";

    try {
      const slackToken = await SlackToken.findOne({ teamId });

      accessToken = slackToken.accessToken;

      const snippetData = snippetStorage[nickname];

      if (!snippetData) {
        throw createError(404, `${nickname}님의 공유된 스니펫이 없습니다.🤭`);
      }

      const { language, code, hashtags: name } = snippetData;

      const filetype = changeType(language);

      const result = await client.files.upload({
        token: accessToken,
        channels: channelId,
        initial_comment: `${nickname}님이 공유한 스니펫입니다.💡`,
        filename: name,
        title: name,
        content: code,
        filetype,
      });

      delete snippetStorage[nickname];

      console.log(result);
    } catch (error) {
      if (error.status === 404) {
        await app.client.chat.postMessage({
          token: accessToken,
          channel: channelId,
          text: error.message,
        });

        return;
      }

      if (!error.data) {
        return;
      }

      const { error: message } = error.data;

      if (message === NOT_IN_CHANNEL) {
        await app.client.chat.postMessage({
          token: accessToken,
          channel: channelId,
          text: REQUEST_ADDING_TO_CHANNEL,
        });

        return;
      }

      logger.error(error);
    }
  });

  app.error(async (error) => {
    console.log(error);
  });

  module.exports = { app, snippetStorage };
})();
