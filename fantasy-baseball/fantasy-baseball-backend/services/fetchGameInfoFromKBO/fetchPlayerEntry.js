/**
 * Get players from some games.
 *
 * @params {Object[]}
 * - The games that have gameId, seasonId, leagueId, and seriesId.
 * @returns {Object}
 * - {
 *    result: boolean,
 *    data: [
 *       {
 *         team: 한화,
 *         name: 류현진,
 *         position: 투수,
 *       },
 *       ...
 *    ],
 *  }
 *
 * example:
 * const entry = await fetchPlayerEntry([
 *   {
 *     gameId: "20210417WOKT0",
 *     leagueId: 1,
 *     seriesId: 0,
 *     seasonId: 2021,
 *     date: "20210417",
 *     time: "17:00",
 *     stadium: "수원",
 *     home: "KT",
 *     away: "키움",
 *     homePitcher: "데스파이네 ",
 *     awayPitcher: "안우진 "
 *   },
 *   ...
 * ]);
 */

const puppeteer = require("puppeteer");
const { KBO_GAME_CENTER_URL } = require("../../constants/kboUrl");

const getPlayersFromEntry = (entry, isHomeTeam, games) => {
  const result = [];

  const teamIndex = isHomeTeam ? 3 : 4;
  const teamEntry = JSON.parse(entry[teamIndex][0]).rows;
  const teamName = entry[teamIndex - 2][0].T_NM;

  const pitcherKey = isHomeTeam ? "homePitcher" : "awayPitcher";
  const pitcher = games.find((game) => {
    const homeAway = isHomeTeam ? "home" : "away";
    return game[homeAway] === teamName;
  })[pitcherKey];

  for (let j = 0; j < teamEntry.length; j += 1) {
    result.push({
      team: teamName,
      name: teamEntry[j].row[2].Text,
      position: teamEntry[j].row[1].Text,
      playerType: "hitter",
    });
  }

  if (pitcher) {
    result.push({
      team: teamName,
      name: pitcher,
      position: "투수",
      playerType: "pitcher",
    });
  }

  return result;
};

const fetchPlayerEntry = async (gameList) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(KBO_GAME_CENTER_URL);

  const entryResponse = await page.evaluate(async (games) => {
    try {
      const data = await Promise.all(
        games.map((game) => {
          const {
            leagueId,
            seriesId,
            seasonId,
            gameId,
          } = game;

          return (
            $.ajax({
              type: "post",
              url: "/ws/Schedule.asmx/GetLineUpAnalysis",
              dataType: "json",
              data: {
                leId: leagueId,
                srId: seriesId,
                seasonId,
                gameId,
              },
            })
          );
        })
      );

      return {
        result: true,
        data,
      };
    } catch (err) {
      return {
        result: false,
        message: err.responseText,
      };
    }
  }, gameList);

  if (!entryResponse.result) {
    throw new Error(entryResponse.message);
  }

  const players = [];
  for (let i = 0; i < entryResponse.data.length; i += 1) {
    const entry = entryResponse.data[i];

    if (entry[0][0].LINEUP_CK) {
      const homeTeamPlayers = getPlayersFromEntry(entry, true, gameList);
      const awayTeamPlayers = getPlayersFromEntry(entry, false, gameList);
      players.push(...homeTeamPlayers, ...awayTeamPlayers);
    }
  }

  await browser.close();

  return players;
};

module.exports = fetchPlayerEntry;
