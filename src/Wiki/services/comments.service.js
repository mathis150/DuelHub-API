import Sequelize from 'sequelize'
import dotenv from "dotenv"

dotenv.config()
sequelize = new Sequelize(process.env.DATABASE_WIKI, process.env.SQL_USER, process.env.SQL_PASSWORD, { host: process.env.SQL_HOST, dialect: 'mysql' })

Comments = sequelize.import("../models/comments.model")

exports.getArticleCommentsByUUID = async (uuid, page) => {
    await sequelize.sync()

    if(page < 1){ page = 1; }
    
    var reponse = {
        code: 200,
        status: null,
        request: "Get all comments of one article get by uuid from the wiki.",
        page: 1*page,
        data: []
    }

    const returnData = await Comments.findAll({where: { uuid_article: uuid }, offset: 25*(page-1), limit: 25})
    returnData.forEach(element => {
        response.data.push(element.dataValues)
    })

    if(response.data.length === 0) {
        response.code = 204
        response.status = "No comments found."
    }
    return reponse
}

exports.getCommentByUUID = async (uuid) => {
    await sequelize.sync()
    
    var reponse = {
        code: 200,
        status: null,
        request: "Get a comments by uuid from the wiki.",
        data: []
    }

    const returnData = await Comments.findAll({where: { uuid: uuid }})
    returnData.forEach(element => {
        response.data.push(element.dataValues)
    })

    if(response.data.length === 0) {
        response.code = 204
        response.status = "No comments found."
    }
    return reponse
}

exports.postCommentToArticle = async(uuid_article, uuid_author, content, published, modified) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Create a new comments for an article in the wiki.",
    }

    if(uuid_article.lenth === 0 || uuid_author.lenth === 0 || content.length === 0) {
        response.code = 400
        reponse.status = "Bad Request, please complete the following fields: uuid_article, uuid_author, content, and optinally one of this fields: published"

        return response
    }
    await sequelize.sync()

    const returnData = await Comments.create({
        uuid_author: uuid_author,
        content: content,
        published: published,
        modified: modified,
        uuid_article: uuid_article
    })

    if(!(returnData instanceof Comments))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to create the comment. Please try again later or contact the administrator."
    }

    return reponse
}

exports.updateCommentByUUID = async (uuid, content, published, modified) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Update a comments for an article in the wiki.",
    }

    if(uuid.length === 0)
    {
        reponse.code = 400
        reponse.status = "Bad Request, please complete the following param: uuid, and one of this fields: content, published"

        return reponse
    }

    await sequelize.sync();

    var request = {}

    if(content.length !== 0){ request.title = content }
    if(published.length !== 0){ request.desc = published }
    request.where = { uuid: uuid }

    const returnData = await Comments.changed(request)

    if(!(returnData instanceof Comments))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to update the comment. Please try again later or contact the administrator."
    }

    return reponse
}

exports.deleteCommentByUUID = async (uuid) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Delete a new article in the wiki.",
    }

    if(uuid.length === 0) {
        reponse.code = 400
        reponse.status = "Bad Request, please complete the following field: uuid"

        return reponse
    }

    await sequelize.sync();
    const returnData = await Comments.destroy({
        where: {
            uuid: uuid 
        }
    });

    if(!(returnData instanceof Articles))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to delete the comment. Please try again later or contact the administrator."
    }
    return reponse
}