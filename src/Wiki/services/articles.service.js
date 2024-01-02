import Sequelize from 'sequelize'
import dotenv from "dotenv"

dotenv.config()
sequelize = new Sequelize(process.env.DATABASE_WIKI, process.env.SQL_USER, process.env.SQL_PASSWORD, { host: process.env.SQL_HOST, dialect: 'mysql' })

Articles = sequelize.import("../models/articles.model")

exports.getWikiArticles = async (page) => {
    await sequelize.sync();

    if(page < 1){ page = 1; }

    var reponse = {
        code: 200,
        status: null,
        request: "Get all articles from the wiki.",
        page: 1*page,
        data: []
    }

    const returnData = await Articles.findAll({offset: 25*(page-1), limit: 25})
    returnData.forEach(element => {
        reponse.data.push(element.dataValues);
    });
    if(reponse.data.length === 0) {
      reponse.code = 204;
      reponse.status = "No articles found.";
    }
    return reponse
}

exports.getWikiArticleByUUID = async (uuid) => {
    await sequelize.sync();

    var reponse = {
        code: 200,
        status: null,
        request: "Get an articles by uuid from the wiki.",
    }

    const returnData = await Articles.findAll({
        where: {
            uuid: uuid
        }
    });
  
    returnData.forEach(element => {
        reponse.article = element.dataValues;
    });
    if(reponse.article === 0) {
        reponse.code = 404;
        reponse.status = "Article not found.";
    }
    return reponse
}

exports.createWikiArticle = async(title, desc, content, icon, uuid_author, published, visibility) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Create a new article in the wiki.",
    }

    if(title.length === 0 || uuid_author.length === 0) {
        reponse.code = 400
        reponse.status = "Bad Request, please complete the following fields: title, uuid_author, and optionnaly: description, content, icon, uuid_author, published, visibility"
    
        return reponse
    }

    await sequelize.sync();
    const returnData = await Articles.create({
        title: title,
        desc: desc,
        content: content,
        icon: icon,
        uuid_author: uuid_author,
        published: published,
        visibility: visibility
    });

    if(!(returnData instanceof Articles))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to create the article. Please try again later or contact the administrator."
    }
    return reponse
}

exports.updateWikiArticle = async(uuid, title, desc, content, icon, uuid_author, published, visibility) => {
    var reponse = {
        code: 200,
        status: null,
        request: "Update a new article in the wiki.",
    }

    if(uuid.length === 0 || (title.length === 0 && desc.length === 0 && content.length === 0 && icon.length === 0 && uuid_author.length === 0 && published.length === 0 && visibility.length === 0)) {
        reponse.code = 400
        reponse.status = "Bad Request, please complete the following param: uuid, and one of this fields: title, description, content, icon, published, visibility"

        return reponse
    }

    await sequelize.sync();

    var request = {}

    if(title.length !== 0){ request.title = title }
    if(desc.length !== 0){ request.desc = desc }
    if(content.length !== 0){ request.content = content }
    if(icon.length !== 0){ request.icon = icon }
    if(published.length !== 0){ request.published = published }
    if(visibility.length !== 0){ request.visibility = visibility }
    if(uuid_author.length !== 0){ request.uuid_author = uuid_author }
    request.where = { uuid: uuid }

    const returnData = await Articles.changed(request)

    if(!(returnData instanceof Articles))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to update the article. Please try again later or contact the administrator."
    }
    return reponse
}

exports.deleteWikiArticle = async(uuid) => {
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
    const returnData = await Articles.destroy({
        where: {
            uuid: uuid 
        }
    });

    if(!(returnData instanceof Articles))
    {
        reponse.code = 400
        reponse.status = "Server is not abble to delete the article. Please try again later or contact the administrator."
    }
    return reponse
}