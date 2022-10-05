const express = require('express');
const mongoose = require('mongoose');
const uniqID = require('uniqid');
const fs = require('fs');
const cheerio = require('cheerio');
const geoip = require('geoip-lite');
const Inliner = require('inliner');
const cookie = require('cookie');

const keys = require('../config/keys');
const Project = require('../models/Project');
const projectMiddleware = require('./project');
const Test = require('../models/Test');
const Visit = require('../models/Visit');
const { GeneralServiceError, WrongEntityError } = require('../lib/error');

const router = express.Router();
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('An error has occured while connecting.', error);
});

db.once('open', () => {
  console.log('The database has been connected.');
});

router.post('/projects/:project_name', projectMiddleware.postProject);

router.get('/projects', projectMiddleware.getProjects);

router.delete('/projects/:project_id', async (req, res, next) => {
  let project = req.params.project_id;
  let testLists;

  try {
    project = await Project.findOneAndDelete({ _id: project });
  } catch (err) {
    return next(new GeneralServiceError());
  }

  try {
    testLists = await Promise.all(project.testIds.map(
      test => Test.findOneAndDelete({ _id: test._id })
    ));
  } catch (err) {
    return next(new GeneralServiceError());
  }

  await Promise.all(
    testLists.map(
      page => Promise.all(page.visitIds.map(id => Visit.findOneAndDelete({ _id: id })))
    )
  );

  res.json(project);
});

router.post('/projects/:project_id/testlist/:test_name', async (req, res, next) => {
  const projectId = req.params.project_id;
  const name = req.params.test_name;
  const uniqId = uniqID();
  let newTest;
  const project = await Project.findById(projectId);

  if (!name || !projectId || !project) {
    return next(WrongEntityError());
  }

  try {
    newTest = await new Test({
      name,
      uniqId,
      projectId,
      clickEvent: [],
      conversion: 0,
      visitIds: [],
      visit_count: 0,
      revisit_count: 0,
      visitorIPs: {},
    }).save();
  } catch (err) {
    return next(GeneralServiceError());
  }

  project.testIds.push(newTest._id);

  await project.save();

  res.json(newTest);
});

router.get('/projects/:project_id/testlist', async (req, res, next) => {
  const projectId = req.params.project_id;

  if (!projectId) {
    return next(WrongEntityError());
  }

  try {
    const project = await Project.findById(projectId);

    const testList = await Promise.all(project.testIds.map(id => Test.findById(id)));

    res.json(testList);
  } catch (err) {
    return next(GeneralServiceError());
  }
});

router.delete('/projects/testlist/:testlist_id', async (req, res, next) => {
  let testList = req.params.testlist_id;

  try {
    testList = await Test.findOneAndDelete({ _id: testList });
  } catch (err) {
    return next(GeneralServiceError());
  }

  const project = await Project.findById(testList.projectId);

  project.testIds.pull(testList._id);

  await Promise.all(
    testList.visitIds.map(id => Visit.findOneAndDelete({ _id: id }))
  );

  await project.save();

  res.json(testList._id);
});

router.get('/test-page/source-file', (req, res, next) => {
  const uniqId = req.query.key;

  if (!uniqId) {
    return next(WrongEntityError());
  }

  fs.unlinkSync('./source/visitor.js');

  const read = fs.createReadStream('./visitor.js');
  const write = fs.createWriteStream('./source/visitor.js');

  write.on('error', err => next(new GeneralServiceError()));

  write.on('close', () => {
    fs.appendFileSync('./source/visitor.js', `const key = "${uniqId}";`);

    const source = fs.readFileSync('./source/visitor.js', 'utf8');

    res.send(source);
  });

  read.pipe(write);
});

router.post('/test-page/:uniqId', async (req, res, next) => {
  const { uniqId } = req.params;
  const event = JSON.parse(req.query.event);
  const ip = req.query.ip || req.connection.remoteAddress;
  const pageIdAndVisitId = req.cookies[uniqId];
  let visitPageId;
  let id;
  let visit;
  let testPage;

  if (pageIdAndVisitId) {
    visitPageId = pageIdAndVisitId.split('$$$')[0];
    id = pageIdAndVisitId.split('$$$')[1];
  }

  event.date = new Date();

  try {
    testPage = await Test.findOne({ uniqId });
  } catch (err) {
    return next(GeneralServiceError());
  }

  if (!uniqId.trim() || !testPage) {
    return next(WrongEntityError());
  }

  if (event.name === 'connect') {
    if (visitPageId && visitPageId === uniqId && testPage.visit_count !== 0) {
      testPage.revisit_count++;
    }

    const geo = geoip.lookup(ip);
    const useragent = {
      isMobile: req.useragent.isMobile,
      browser: req.useragent.browser,
    };

    try {
      visit = await new Visit({
        geo,
        ip,
        connected_at: new Date(),
        left_at: '',
        useragent,
      }).save();
    } catch (err) {
      return next(GeneralServiceError());
    }

    testPage.visitIds.push(visit._id);

    if (!testPage.url) {
      const { url } = event;

      testPage.url = url;
    }

    testPage.visit_count++;

    const newPageIdAndVisitId = `${uniqId}$$$${visit._id}`;

    res.setHeader('Set-Cookie', cookie.serialize(`${uniqId}`, String(newPageIdAndVisitId), {
      maxAge: 60 * 60 * 24 * 7,
    }));
  }

  if (event.name === 'click') {
    testPage.clickEvent.push(event);

    if (event.isButtonCTA) {
      testPage.conversion++;
    }
  }

  if (event.name === 'leave' && id) {
    const preVisit = await Visit.findById(id);

    preVisit.left_at = new Date();

    await preVisit.save();
  }

  await testPage.save();

  res.end();
});

router.get('/test-page/:uniqId/screen-shot', async (req, res, next) => {
  const { uniqId } = req.params;
  let testPage;
  const script = fs.readFileSync('./bubble.js', 'utf8');

  try {
    testPage = await Test.findOne({ uniqId });
  } catch (err) {
    return next(GeneralServiceError());
  }

  const coordinate = testPage.clickEvent.map(event => [event.x, event.y]);

  const dataset = 'const dataset = ' + JSON.stringify(coordinate);

  const html = await new Promise((resolve, reject) => {
    new Inliner(testPage.url, (err, response) => {
      resolve(response);
    });
  });

  const $ = cheerio.load(html);

  $('body').append(script + dataset + '</script>');

  res.send($.html());
});

router.get('/project/test-page/visit/:visit_id', async (req, res, next) => {
  const visitId = req.params.visit_id;
  let visit;

  try {
    visit = await Visit.findById(visitId);
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(visit);
});

module.exports = router;
