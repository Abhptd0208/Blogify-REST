const models = require('../models');

async function test(req, res){

    // 1:1 (user can have only 1 address, OR an address belongs to 1 user)
    // 1:M (user has many posts OR post can have many comments)
    // M:M (post belong to many categories)

    // ONE to ONE
    const user = await models.User.findByPk(1, {
        // in the array below we pass the model we need association form
        include:[models.address]
    });


    res.status(200).json({
        data : user
    })
}

module.exports = {
    test:test
}