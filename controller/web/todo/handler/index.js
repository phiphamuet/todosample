module.exports = app => ({
    findTodo: async (req, res) => {
        console.log(req.user);
        let limit = req.body.limit || 10,
            page = req.body.page || 1,
            offset = 0,
            author = req.user.username;
        if (page > 1)
            offset = (page - 1) * limit;

        const results = await app.seneca.exec({
            role: 'todo', cmd: 'findTodo', limit, offset, author
        });

        return res.jsonp({
            status: 200,
            message: 'Danh sach todo',
            data: results
        });
    },

    findTodoById: async (req, res) => {
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'findTodoById', id: req.params.id
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'Thong tin todo',
                data: result
            });
        return res.jsonp({
            status: 401,
            message: 'Khong tim thay du lieu'
        });
    },

    createTodo: async (req, res) => {
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'createTodo', payload: {
                author: req.body.author,
                text: req.body.text,
                complete: req.body.complete
            }
        });
        return res.jsonp({
            status: 201,
            message: 'tao moi du lieu thanh cong',
            data: result
        });
    },

    updateTodo: async (req, res) => {
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'updateTodo', id: req.params.id,
            payload: {
                author: req.body.author,
                text: req.body.text,
                complete: req.body.complete
            }
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'cap nhat thong tin thanh cong',
                data: result
            });

        return res.jsonp({
            status: 401,
            message: 'khong tim thay todo voi id: ' + req.params.id
        });
    },

    deleteTodo: async (req, res) => {
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'deleteTodo', id: req.params.id
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'xoa todo thanh cong',
                data: result
            });
        return res.jsonp({
            status: 201,
            message: 'Khong tim thay ban ghi hoac da duoc xoa truoc do'
        });
    }
});
