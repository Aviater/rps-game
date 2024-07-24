import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./src/swagger_output.json";
import { requestLogger } from './src/middleware';
import { gameRouter, playerRouter } from "./src/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use('/api/game', requestLogger, gameRouter);
app.use('/api/player', requestLogger, playerRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
	console.log(`Server started in ${env} mode.`);
	console.log(`Server running on port ${port}...`);
});