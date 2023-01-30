const mongoose = require("mongoose");
const createError = require("http-errors");
const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");
const { URL } = require("url");

const Project = require("../models/Project");
const ERROR = require("../constants/error");

exports.patchProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const {
      code: { html, css, js },
    } = req.body;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    if (
      project.htmlFile === html &&
      project.cssFile === css &&
      project.jsFile === js
    ) {
      return res.status(200).json({ result: "Success" });
    }

    project.htmlFile = html;
    project.cssFile = css;
    project.jsFile = js;

    await project.save();

    res.status(200).json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.postDeployment = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    project.deployLink = `${process.env.BACK_URL}/api/projects/${projectId}/deployment`;
    project.deployedAt = new Date();

    await project.save();

    res.status(200).json({ result: "Success", deployLink: project.deployLink });
  } catch (err) {
    next(err);
  }
};

exports.getDeployment = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const project = await Project.findById(projectId).lean();

    if (!project || !project.deployLink) {
      return res.render("notFound");
    }

    res.render("deployedProject", { project });
  } catch (err) {
    next(err);
  }
};

exports.postPerformance = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const url = `${process.env.BACK_URL}/api/projects/${projectId}/deployment`;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const lighthouseResult = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: "json",
      logLevel: "info",
    });

    await browser.close();

    const {
      categories: {
        performance: { score: performanceScore },
        accessibility: { score: accessibilityScore },
        "best-practices": { score: bestPracticesScore },
        seo: { score: seoScore },
        pwa: { score: pwaScore },
      },
    } = lighthouseResult.lhr;

    const measuringResult = {
      performance: performanceScore * 100,
      accessibility: accessibilityScore * 100,
      bestPractices: bestPracticesScore * 100,
      seo: seoScore * 100,
      pwa: pwaScore * 100,
    };

    res.status(200).json({ result: "Success", measuringResult });
  } catch (err) {
    next(err);
  }
};
