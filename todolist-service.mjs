export class TodolistService {
    todolist = ["Aldi", "Nugraha", "Putri", "Namira"];

    getJsonTodolist() {
        return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todolist.map((value, index) => {
                return {
                    id: index,
                    todo: value
                }
            })
        })
    }

    // GET data
    getTodolist(request, response) {
        response.write(this.getJsonTodolist());
        response.end()
    }

    // POST data
    createTodolist(request, response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todolist.push(body.todo);

            response.write(this.getJsonTodolist());
            response.end()
        })
    }

    //PATCH data
    updateTodolist(request, response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if(this.todolist[body.id]) {
                this.todolist[body.id] = body.todo
            }

            response.write(this.getJsonTodolist());
            response.end();
        })
    }

    //DELETE data
    deleteTodolist(request, response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if(this.todolist[body.id]) {
                this.todolist.splice(body.id, 1);
            }

            response.write(this.getJsonTodolist());
            response.end();
        })
    }
}