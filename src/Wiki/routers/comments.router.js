import express from 'express'
export const router = express.Router()
import * as commentsController from '../controllers/comments.controller'
import * as commentsMiddleware from '../middleware/comments.middleware'

router.get('/articles/:uuid-article', commentsMiddleware.checkArticlesCommentsUUID, commentsController.getArticlesCommentsByUUID)
router.get('/:uuid-comment', commentsMiddleware.checkCommentUUID, commentsController.getCommentByUUID)
router.post('/', commentsMiddleware.checkPostCommentUUID, commentsController.postCommentToArticle)
router.put('/:uuid-comment', commentsMiddleware.checkUpdateCommentUUID, commentsController.updateCommentByUUID)
router.delete('/:uuid-comment', commentsMiddleware.checkDeleteCommentUUID, commentsController.deleteCommentByUUID)