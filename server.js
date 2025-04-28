// server.js
import express from "express";
import chalk from "chalk";
import { rateLimit } from "express-rate-limit";
import fs from "fs";
import logger from "./src/utils/errorLogger.js";
import { AppError } from "./src/utils/appError.js";
import appLogger from "./src/utils/appLogger.js";
import _ from "./config/connectDb.js";
import {
  GLOBAL_RATE_LIMIT_CONFIG,
  PER_IP_RATE_LIMIT_CONFIG,
  PORT,
  NODE_ENV,
} from "./config/index.js";
import cors from "cors";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const version = packageJson.version.split(".")[0];
const app = express(); 

app.use(cors());
app.use(express.json({
  strict: true, 
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (err) {
      throw new AppError({
        message: 'Invalid JSON format.',
        statusCode: 400,
      });
    }
  }
}));
app.use(appLogger);
app.use(rateLimit(GLOBAL_RATE_LIMIT_CONFIG));
app.use(rateLimit(PER_IP_RATE_LIMIT_CONFIG));
app.use(express.urlencoded({ extended: true }));

import incidentRoute from "./src/routes/incident.route.js";
app.use(`/api/v${version}`, incidentRoute);

app.use((err, req, res, next) => {
  try {
    const isDev = NODE_ENV === "development";
    try {
      logger.error(`
        ❌ ERROR MESSAGE: ${err}
        🔥 STACK TRACE: ${err.stack || "N/A"}
        📂 FILES: ${JSON.stringify(req.files || "No Files", null, 1)}
        📥 REQUEST BODY: ${JSON.stringify(req.body || {}, null, 1)}
        🔗 HEADERS: ${JSON.stringify(req.headers, null, 1)}
      `);
    } catch (logError) {
      console.error("🚨 Logger failed:", logError);
    }
    
    if (!(err instanceof AppError)) {
      err = new AppError({
        message: isDev ? err.message : "Internal Server Error",
        statusCode: 500,
      });
    }

    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      success: err.success ?? false,
      data: err.data || [],
      errors: err.errors || [],
    });

  } catch (fatalError) {
    logger.error(
      `🔥 Critical Error in Error Handler:- ErrorStack : ${fatalError.stack}`
    );
    res.status(500).json({
      message: "Internal server fatal Error",
      statusCode: 500,
      success: false,
      data: [],
      errors: [],
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server is running in ${chalk.yellow(
      NODE_ENV
    )} mode at http://localhost:${chalk.yellow(PORT)}`
  );
});
