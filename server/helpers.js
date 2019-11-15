  
const knex = require("../data/config")

module.exports = {
    add,
    get
}

function add(user) {
    return knex("users")
        .insert(user)
}

function get(username = "%") {
    return knex("users")
        .select("*")
        .where("username", "like", username)

}