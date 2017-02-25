module.exports = (app) => {
    const todoHandler = require('./handler')(app);

    return {
        "/": {
            get: {
                handler: todoHandler.findTodo,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['todo_manage'],
                    option: {}
                }
            }
        },
        "/:id": {
            get: {
                handler: todoHandler.findTodoById
            },
            put: {
                handler: todoHandler.updateTodo
            },
            delete: {
                handler: todoHandler.deleteTodo
            }
        },
        "/create": {
            post: {
                handler: todoHandler.createTodo
            }
        },
        "/cors/:id([0-9]+)": {
            get: {
                handler: todoHandler.findTodoById,
                middleware: [],
                cors: 'chotoxautinh.com'
            }
        },
        // "/auth/test": {
        //     get: {
        //         handler: (req, res) =>
        //             res.json(req.user)
        //         ,
        //         authenicate: {
        //             name: 'secondJWT',
        //             permissions: ['manage_todo'],
        //             option: {}
        //         }
        //     }
        // }
    }
}