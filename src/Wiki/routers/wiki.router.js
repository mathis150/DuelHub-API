import express from 'express'
const router = express.Router()
import * as articlesRouter from'./articles.router'
import * as commentsRouter from'./comments.router'
import * as editorsRouter from './editors.router'

router.get('/articles/', articlesRouter)
router.get('/comments/', commentsRouter)
router.get('/editors/', editorsRouter)