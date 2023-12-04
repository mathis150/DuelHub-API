const express = require('express')
export const router = express.Router()
const editorController = require('../controllers/editor.controller')

router.get('/:uuid-article', editorController.getArticlesEditorsByUUID)
router.get('/:uuid-editor', editorController.getEditorArticlesByUUID)
router.post('/:uuid-article', editorController.postCommentToArticle)
router.put('/:uuid-editor/:uuid-article', editorController.updateCommentByUUID)
router.delete('/:uuid-editor/:uuid-article', editorController.deleteCommentByUUID)