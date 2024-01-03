import { getWikiArticles, getWikiArticleByUUID, createWikiArticle,updateWikiArticle ,deleteWikiArticle } from '../services/articles.service'

exports.getWikiArticles = async (req, res) => {
    const returnData = await getWikiArticles(req.body.page)
    res.json(returnData)
}
exports.getWikiArticleByUUID = async (req, res) => {
    const returnData = await getWikiArticleByUUID(req.params.uuid)
    res.json(returnData)
}
exports.createWikiArticle = async (req, res) => {
    const returnData = await createWikiArticle(req.body.title, req.body.description, req.body.content, req.body.icon, req.body.uuid_author, req.body.published, req.body.visibility)
    res.json(returnData)
}
exports.updateWikiArticle = async (req, res) => {
    const returnData = await updateWikiArticle(req.params.uuid, req.body.title, req.body.description, req.body.content, req.body.icon, req.body.uuid_author, req.body.published, req.body.visibility)
    res.json(returnData)
}
exports.deleteWikiArticle = async (req, res) => {
    const returnData = await deleteWikiArticle(req.params.uuid)
    res.json(returnData)
}
