import { getArticlesEditorsByUUID, getEditorByUUID, addEditorToArticle, deleteEditorByUUID } from '../services/articles.service'

exports.getArticlesEditorsByUUID = async (req, res) => {
    const returnData = await getArticlesEditorsByUUID(req.params.uuid-article, req.body.page)
    res.json(returnData)
}
exports.getEditorByUUID = async (req, res) => {
    const returnData = await getEditorByUUID(req.params.uuid-editor, req.body.page)
    res.json(returnData)
}
exports.addEditorToArticle = async (req, res) => {
    const returnData = await addEditorToArticle(req.body.uuid-author, req.body.uuid_article)
    res.json(returnData)
}
exports.deleteEditorByUUID = async (req, res) => {
    const returnData = await deleteEditorByUUID(req.params.uuid-editor, req.params.uuid-article)
    res.json(returnData)
}