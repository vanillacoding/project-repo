const { BaseError, BadRequestError } = require('../lib/errors');
const puppeteer = require('puppeteer');

exports.crawlPlantNames = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword.length) {
      next(new BadRequestError('검색어를 입력해주세요'));
    }
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const searchUrl = 'https://www.treeinfo.net/plant/list.php';

    await page.goto(searchUrl);
    await page.type('input#search', keyword);
    await page.type('input#search', String.fromCharCode(13));
    await page.waitForSelector('table .list_tr', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const contents = Array.from(
        document.querySelectorAll('table .list_tr .list-subject > a'),
      );
      const results = [];

      contents.forEach((result) => {
        const name = result.innerText.replaceAll('\n', ' ').trim();
        const link = result.href;
        const startIndex = link.indexOf('ti_no') + 6;
        const endIndex = link.indexOf('&search');

        const number = Number(link.slice(startIndex, endIndex));

        results.push({ name, number });
      });

      return results;
    });

    await browser.close();

    return res.status(201).json({ data });
  } catch {
    return next(new BaseError());
  }
};

exports.crawlPlantInfo = async (req, res, next) => {
  try {
    const { number } = req.params;
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const scrapUrl = `https://www.treeinfo.net/plant/view.php?ti_no=${number}`;

    await page.goto(scrapUrl);
    await page.waitForSelector('div.spec_text', { timeout: 10000 });
    await page.waitForSelector('div#div_gardening div', { timeout: 10000 });

    const plantData = await page.evaluate(() => {
      const results = {};
      const gardeningData = [];

      const plantInfo = document.querySelector('div.spec_text');
      const gardeningnfo = Array.from(
        document.querySelectorAll('div#div_gardening div'),
      );

      const name = plantInfo.children[0].innerText;
      const scientificName = plantInfo.children[1].innerText.split('\n')[1];
      const englishName = plantInfo.children[2].innerText.split('\n')[1];
      const species = plantInfo.children[3].innerText.split('\n')[1];

      results.name = name;
      results.scientificName = scientificName;
      results.englishName = englishName;
      results.species = species;

      gardeningnfo.forEach((content) => {
        const info = content.innerText.trim().split('\n')[1];

        gardeningData.push(info);
      });

      const sunData = gardeningData[0];
      const waterData = gardeningData[1];

      if (sunData && sunData.includes('음지')) {
        results.isSunPlant = false;
      } else {
        results.isSunPlant = true;
      }

      if (waterData && waterData.includes('1')) {
        results.watering = 1;
      } else if (waterData && waterData.includes('3')) {
        results.watering = 3;
      } else {
        results.watering = 5;
      }

      return results;
    });

    await browser.close();

    return res.status(201).json({ plantData });
  } catch {
    return next(new BaseError());
  }
};
