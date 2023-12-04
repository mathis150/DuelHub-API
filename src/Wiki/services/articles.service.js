import Sequelize from 'sequelize'
import dotenv from "dotenv"

dotenv.config()
sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, { host: process.env.HOST, dialect: 'mysql' })

Articles = sequelize.import("../../models/articles.model")

/*
{
    "code" : 200,
    "status" : null,
    "request" : "friendlist of user (uuid)",

    data :
        [
            {
                uuid:787977987987987899787,
                route: "address:port/user/787977987987987899787"
            },
            {
                uuid:847779844566511121341,
                route: "address:port/user/847779844566511121341"
            }
        ]
    }
}
*/

exports.getWikiArticles = async (page) => {
    await sequelize.sync();

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
        reponse.status = "Bad Request, please complete the following field: title, uuid_author"
    }
    else {
        await sequelize.sync();
        const returnData = await Articles.create({
            title: title,
            desc: desc,
            content: content,
            icon: icon,
            uuid_author: uuid_author,
            published: published,
            visibility: vasibility
        });

        if(!(returnData instanceof Articles))
        {
            reponse.code = 500
            reponse.status = "Server is not abble to create the article. Please try again later or contact the administrator."
        }
    }
    return reponse
}