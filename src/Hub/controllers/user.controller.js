const testjson = {
    code:200,
    message:"message uwu"
}

//?GET FUNCTIONS
//userinfo
export const get_userinfo = (req,res) => {
    res.status(200).json(testjson)
}
export const get_useradvancedinfo = (req,res) => {
    //TODO: implement
}

//friendlist
export const get_friendlist = (req,res) => {
    //TODO: implement
}
export const get_friendlistdetails = (req,res) => {
    //TODO: implement
}

//favorite list
export const get_favoritelist = (req,res) => {
    //TODO: implement
}
export const get_favoritelistdetails = (req,res) => {
    //TODO: implement
}

//game list
export const get_gamelist = (req,res) => {
    //TODO: implement
}
export const get_gamelistdetails = (req,res) => {
    //TODO: implement
}

//roolist
export const get_roomlist = (req,res) => {
    //TODO: implement
}

//?POST FUNCTIONS

export const post_addfavorite = (req,res) => {
    //TODO: implement
}

export const post_addfriend = (req,res) => {
    //TODO: implement
}

export const post_addgame = (req,res) => {
    //TODO: implement
}

export const post_addroom = (req,res) => {
    //TODO: implement
}

//?DELETE FUNCTIONS

export const delete_removefavorite = (req,res) => {
    //TODO: implement
}

export const delete_removefriend = (req,res) => {
    //TODO: implement
}

export const delete_removegame = (req,res) => {
    //TODO: implement
}

export const delete_removeroom = (req,res) => {
    //TODO: implement   
}

