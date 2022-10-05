const winston = require("winston");
const WinstonDaily = require("winston-daily-rotate-file");
require("winston-syslog");
const localhost = require("os").hostname();

const logDir = "logs";
const { combine, timestamp, printf } = winston.format;
const logFormat = printf((info) => (
  `${info.timestamp} ${info.level}: ${info.message}`
));

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new WinstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`,
      filename: "%DATE%.error.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

const options = {
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT,
  app_name: "fantasy-baseball",
  localhost,
};

logger.add(new winston.transports.Syslog(options));

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
