import { getArticlesCommentsByUUID, getCommentByUUID, postCommentToArticle, updateCommentByUUID, deleteCommentByUUID } from '../services/articles.service'

exports.getArticlesCommentsByUUID = async (req, res) => {
    const returnData = await getArticlesCommentsByUUID(req.params.uuid-article, req.body.page)
    res.json(returnData)
}
exports.getCommentByUUID = async (req, res) => {
    const returnData = await getCommentByUUID(req.params.uuid-comment)
    res.json(returnData)
}
exports.postCommentToArticle = async (req, res) => {
    const returnData = await postCommentToArticle(req.body.uuid_article, req.body.uuid_author, req.body.content, req.body.published, req.body.modified)
    res.json(returnData)
}
exports.updateCommentByUUID = async (req, res) => {
    const returnData = await updateCommentByUUID(req.params.uuid-comment, req.body.content, req.body.published, req.body.modified)
    res.json(returnData)
}
exports.deleteCommentByUUID = async (req, res) => {
    const returnData = await deleteCommentByUUID(req.params.uuid-comment)
    res.json(returnData)
}