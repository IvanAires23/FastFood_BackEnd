import express from 'express'
import cors from 'cors'
import httpStatus from 'http-status'
import { loadEnv } from './config/envs.js'
import router from './router/index.routes.js'
import { printer, types } from 'node-thermal-printer';
import fs from 'fs';

loadEnv()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/health', (req, res) => res.status(httpStatus.OK).send("I'm ok!")).use(
    router
)
  
export default app
