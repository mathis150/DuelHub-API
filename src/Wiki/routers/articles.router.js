import express from 'express'
export const router = express.Router()
import * as articleController from '../controllers/article.controller'
import * as articlesMiddleware from '../middleware/articles.middleware'

router.get('/', articleController.getWikiArticles)
router.get('/:uuid', articlesMiddleware.checkUUID, articleController.getWikiArticleByUUID)
router.post('/', articleController.createWikiArticle)
router.put('/:uuid', articlesMiddleware.checkUUID, articleController.updateWikiArticle)
router.delete('/:uuid', articlesMiddleware.checkUUID, articleController.deleteWikiArticle)