const models = require('../models');

async function addAddress(req, res) {
    try {
        const { address, userId } = req.body;

        const newAddress = await models.address.create({ address, userId });

        res.status(201).json({
            message: `Address has been inserted for the respected user ${userId}`,
            data: newAddress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addAddress };
