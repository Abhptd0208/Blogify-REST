const Validator = require('fastest-validator')
const models = require('../models')
// const { post } = require('../routes/posts')

//function to create post
function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId
    }

    const schema = {
        title: { type: "string", optional: false, max: 100 },
        content: { type: "string", optional: false, max: 500 },
        categoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.categoryId).then(result => {
        if (result != null) {
            models.Post.create(post).then(result => {
                res.status(201).json({
                    message: "Post created successfully",
                    post: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            })

        } else {
            res.status(400).json({
                message: "Invalid category ID"
            })
        }
    });
}

//Function to get post by id
function show(req, res) {
    const id = req.params.id;
    models.Post.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: `Post with ID ${id} not found`
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

//Funtcion to get all the post
function index(req, res) {
    models.Post.findAll().then(result => {
        //Using the models.Post.findAll()it returns a promise hence we used then for successfull response catch for erro handling
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ message: "Something went wrong" })
    })
}

//function to update post
function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    }
    const userId = req.userData.userId;

    const schema = {
        title: { type: "string", optional: false, max: 100 },
        content: { type: "string", optional: false, max: 500 },
        categoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    //userId: userId column name:column value
    models.Category.findByPk(req.body.categoryId).then(result => {
        if (result != null) {
            models.Post.update(updatedPost, { where: { id: id, userId: userId } }).then(([affectedRows]) => {
                if (affectedRows == 0) {
                    return res.status(404).json({
                        message: `No post found with id ${id} for this user`
                    })
                }
                res.status(200).json({
                    message: "Post updated successfully",
                    post: updatedPost
                })
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                })
            })
        } else {
            res.status(400).json({
                message: "Invalid category ID"
            })
        }
    });
}

//function to delete post
function deletePost(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId
    // using destroy we are deleting the post using where condition to see which post need to be deleted and the userId
    models.Post.destroy({ where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: "Post deleted Successfully"
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
            error: error
        })
    })
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    deletePost: deletePost
}