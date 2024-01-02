import express from 'express'
export const router = express.Router()
import * as editorController from '../controllers/editor.controller'
import * as editorsMiddleware from '../middleware/editors.middleware'

router.get('/articles/:uuid-article', editorsMiddleware.checkArticleUUID, editorController.getArticlesEditorsByUUID)
router.get('/:uuid-editor', editorsMiddleware.checkEditorUUID, editorController.getEditorByUUID)
router.post('/', editorController.addEditorToArticle)
router.delete('/:uuid-editor/:uuid-article', editorsMiddleware.checkDeleteUUID, editorController.deleteEditorByUUID)