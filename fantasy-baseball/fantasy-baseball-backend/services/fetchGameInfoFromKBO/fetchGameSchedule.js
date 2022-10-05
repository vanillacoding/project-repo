/**
 * Get game schedule from KBO game center.
 *
 * @params {number|string} [dateNumber]
 * - The DateNumber(yyyymmdd) of the game you want to get.
 * @returns {Object}
 * - {
 *    result: boolean,
 *    data: [
 *      {
 *        gameId: "20210417WOKT0",
 *        leagueId: 1,
 *        seriesId: 0,
 *        seasonId: 2021,
 *        date: "20210417",
 *        time: "17:00",
 *        stadium: "수원",
 *        home: "KT",
 *        away: "키움",
 *        homePitcher: "데스파이네 ",
 *        awayPitcher: "안우진 "
 *      },
 *      ...
 *   ],
 * }
 *
 * example:
 * const gameList = await fetchGameSchedule(20210416);
 */

const puppeteer = require("puppeteer");
const { KBO_GAME_CENTER_URL } = require("../../constants/kboUrl");

const fetchGameSchedule = async (dateNumber) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(KBO_GAME_CENTER_URL);

  const gameListResponse = await page.evaluate(async (date) => {
    try {
      const response = await $.ajax({
        type: "post",
        url: "/ws/Main.asmx/GetKboGameList",
        dataType: "json",
        data: {
          leId: "1",
          srId: "0,1,3,4,5,7,8,9",
          date,
        },
      });

      return {
        result: true,
        data: response.game,
      };
    } catch (err) {
      return {
        result: false,
        message: err.responseText,
      };
    }
  }, dateNumber);

  if (!gameListResponse.result) {
    throw new Error(gameListResponse.message);
  }

  const gameList = gameListResponse.data.map((game) => ({
    gameId: game.G_ID,
    leagueId: game.LE_ID,
    seriesId: game.SR_ID,
    seasonId: game.SEASON_ID,
    date: game.G_DT,
    time: game.G_TM,
    stadium: game.S_NM,
    home: game.HOME_NM,
    away: game.AWAY_NM,
    homePitcher: (game.B_PIT_P_NM || "").trim(),
    awayPitcher: (game.T_PIT_P_NM || "").trim(),
  }));

  await browser.close();

  return gameList;
};

module.exports = fetchGameSchedule;
