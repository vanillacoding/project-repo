const express = require('express');
const router = express.Router();
const cors = require('cors');

const fs = require('file-system');
const PDFDoc = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const { BitlyClient } = require('bitly');
const bitly = new BitlyClient('28c7710f28bd22f3010633ad2aa86f367f30f978', {});
//s3 server
const AWS = require('aws-sdk');
//const uuid = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET
});

/* GET home page. */
router.get('/', cors(), function(req, res, next) {
  res.render('index', { title: 'Expsress' });
});

router.post('/toPDF', cors(), (req, res, next) => {
  var doc = new PDFDoc();
  var svg = req.body.tagData;
  var stream = fs.createWriteStream('notes.pdf');
  SVGtoPDF(doc, svg, 0, 0);
  
  PDFDoc.prototype.addSVG = function (svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options), this;
  }

  doc.addSVG(svg, 0, 0);

  doc.end();

  var params = {
    Key: `${Date.now().toString()}-notes.pdf`,
    Body: doc,
    Bucket: 'type-your-melody',
    ContentType: 'application/pdf',
    ACL: 'public-read'
  }

  s3.upload(params, function(err, data) {
    if(err) {
      res.status(400).json({
        msg: "upload failed"
      });
    } else if(data) {
      bitly.shorten(data.Location)
      .then(function(result) {
        res.status(200).json({
          url: result.url
        }); 
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  });
});

router.options('/toPDF', cors(), function (req, res, next) {
  res.status(200).end();
});

module.exports = router;
