const express = require('express')
export const router = express.Router()
const commentsController = require('../controllers/comments.controller')

router.get('/:uuid-article', commentsController.getArticlesCommentsByUUID)
router.get('/:uuid-comment', commentsController.getCommentGetByUUID)
router.post('/:uuid-article', commentsController.postCommentToArticle)
router.put('/:uuid-comment', commentsController.updateCommentByUUID)
router.delete('/:uuid-comment', commentsController.deleteCommentByUUID)