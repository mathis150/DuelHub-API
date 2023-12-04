import express from 'express'
export const router = express.Router()
import articleController from '../controllers/article.controller'

router.get('/', articleController.getWikiArticles)
router.get('/:uuid', articleController.getWikiArticleByUUID)
router.post('/', articleController.createWikiArticle)
router.put('/:uuid', articleController.updateWikiArticle)
router.delete('/:uuid', articleController.deleteWikiArticle)