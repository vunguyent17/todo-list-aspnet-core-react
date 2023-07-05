import React, { useState, useEffect } from 'react'
import ToDoTaskFromModal from "./ToDoTaskFormModal"
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';

const ToDoList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadData, setReloadData] = useState(0);
    const [editTaskId, setEditTaskId] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("api/todo");
            const data = await response.json();
            console.log(data);
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [reloadData]);

    const handleBtnNewTaskModal = (event) => {
        event.preventDefault();
        setEditTaskId('');
    }
    const handleEdit = (event) => {
        event.preventDefault();
        let target_id = event.currentTarget.parentNode.getAttribute("data-task-id");
        setEditTaskId(target_id);
    }

    const handleDelete = (event) => {
        let target_id = event.currentTarget.parentNode.getAttribute("data-task-id");
        let user_confirm = window.confirm("Do you want to delete this task?");
        if (user_confirm === true) {
            fetch(`/api/todo/${target_id}`, { method: 'delete' }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    setReloadData((i) => i + 1);
                    alert("Delete complete");
                } else {
                    console.log('Somthing happened wrong');
                }
            }).catch(err => err);
        }

    }
    const handleCheckbox = (event) => {
        fetch(`/api/todo`, { method: "put", body: JSON.stringify({ id: event.target.value, is_done: event.target.checked }), headers: { 'content-type': 'application/json' }, }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                setReloadData((i) => i + 1);
            } else {
                console.log('Somthing happened wrong');
            }

        }).catch(err => err);
    }
    function handleCollapse(event) {
        if (event.currentTarget.classList.contains('collapsed'))
            event.currentTarget.innerHTML = '<i class="bi bi-chevron-down"></i> See more';
        else
            event.currentTarget.innerHTML = '<i class="bi bi-chevron-up"></i> Hide';
    }

    let timeOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let doneTaskClass = "text-decoration-line-through text-secondary";

    const renderToDoTable = (todos) => {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th></th>
                        <th>Task</th>
                        <th>Created at</th>
                        <th>Last modified at</th>

                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr key={"key_" + `${todo.id}`} >
                            <td> <input className="form-check-input" type="checkbox" value={todo.id} id="checkboxToDo" defaultChecked={todo.is_done === true ? "checked" : ""} onClick={(e) => handleCheckbox(e)} /></td>
                            <td><h5 className={todo.is_done === true ? doneTaskClass : ""}>{todo.title}</h5>
                                <div className="collapse" id={"task" + todo.id}>
                                    <div className="card card-body">
                                        {todo.content}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <a className="collapse-task btn btn-link mr-auto text-decoration-none" data-bs-toggle="collapse" href={"#task" + todo.id} role="button" aria-expanded="false" aria-controls={"#task" + todo.id} onClick={(e) => handleCollapse(e)}>
                                        <i className="bi bi-chevron-down"></i> See more
                                    </a>
                                    <div data-task-id={todo.id}>
                                        <button className="btn btn-link" data-bs-toggle="modal" data-bs-target="#taskFormModal" onClick={(e) => handleEdit(e)}><i className="bi bi-pen"></i> Edit</button>
                                        <button className="btn btn-link" onClick={(e) => handleDelete(e)}><i className="bi bi-trash"></i> Delete</button>
                                    </div>
                                </div>
                            </td>
                            <td className={todo.is_done === true ? doneTaskClass : ""}>{new Date(Date.parse(todo.created_at)).toLocaleString('en-us', timeOptions)}</td>
                            <td className={todo.is_done === true ? doneTaskClass : ""}>{new Date(Date.parse(todo.modified_at)).toLocaleString('en-us', timeOptions)}</td>
                        </tr>
                    )}
                </tbody>
            </table >
        );
    }

    return (loading == true ? <i>Loading...</i> :
        <div>
            <div className="d-flex justify-content-between">
                <h1 id="tabelLabel" >To Do List</h1>
                <button id="btnTaskFormModal" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskFormModal" onClick={(event) => handleBtnNewTaskModal(event)}>Add new task</button>
            </div>
            <ToDoTaskFromModal editTaskId={editTaskId} reload={setReloadData} />
            {renderToDoTable(data)}
        </div>)
}

export default ToDoList;