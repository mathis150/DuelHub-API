import Sequelize from 'sequelize'
import dotenv from "dotenv"

dotenv.config()
sequelize = new Sequelize(process.env.DATABASE_WIKI, process.env.SQL_USER, process.env.SQL_PASSWORD, { host: process.env.SQL_HOST, dialect: 'mysql' })

Editors = sequelize.import("../models/editors.model")

exports.getArticlesEditorsByUUID = async (uuid, page) => {
    await sequelize.sync()

    if(page < 1){ page = 1; }
    
    var reponse = {
        code: 200,
        status: null,
        request: "Get all editors of one article get by uuid from the wiki.",
        page: 1*page,
        data: []
    }

    const returnData = await Editors.findAll({where: { uuid_article: uuid }, offset: 25*(page-1), limit: 25})
    returnData.forEach(element => {
        response.data.push(element.dataValues)
    })

    if(response.data.length === 0) {
        response.code = 204
        response.status = "No editors found."
    }
    return reponse
}

exports.getEditorByUUID = async (uuid, page) => {
    await sequelize.sync()

    if(page < 1){ page = 1; }
    
    var reponse = {
        code: 200,
        status: null,
        request: "Get all articles of editors get by uuid from the wiki.",
        page: 1*page,
        data: []
    }

    const returnData = await Editors.findAll({where: { uuid_author: uuid }, offset: 25*(page-1), limit: 25})
    returnData.forEach(element => {
        response.data.push(element.dataValues)
    })

    if(response.data.length === 0) {
        response.code = 204
        response.status = "No editors found."
    }
    return reponse
}

exports.addEditorToArticle = async(uuid_author, uuid_article) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Add an editor on an article in the wiki.",
    }

    if(uuid_author.lenth === 0 || uuid_article.lenth === 0) {
        response.code = 400
        reponse.status = "Bad Request, please complete the following fields: uuid_author, uuid_article"

        return response
    }
    await sequelize.sync()

    const returnData = await Comments.create({
        uuid_author: uuid_author,
        uuid_article: uuid_article
    })

    if(!(returnData instanceof Comments))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to add an editor to the article. Please try again later or contact the administrator."
    }

    return reponse
}

exports.deleteCommentByUUID = async (uuid_author, uuid_article) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Delete the connection between an article and an editor in the wiki.",
    }

    if(uuid.length === 0) {
        reponse.code = 400
        reponse.status = "Bad Request, please complete the following params: uuid_author, uuid_article"

        return reponse
    }

    await sequelize.sync();
    const returnData = await Comments.destroy({
        where: {
            uuid_author: uuid_author,
            uuid_article: uuid_article
        }
    });

    if(!(returnData instanceof Articles))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to delete the connection. Please try again later or contact the administrator."
    }
    return reponse
}