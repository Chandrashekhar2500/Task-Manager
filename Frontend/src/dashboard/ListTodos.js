import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deletetodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter((todo) => todo.id !== id));
            console.log(deletetodo, 'deletetodo');
        } catch (error) {
            console.log(error);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            // console.log(jsonData, 'jsonData');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, [])
    return (
        <>
            {" "}
            <table className='table mt-5 text-center'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><button><EditTodo todo={todo} /></button></td>
                            <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListTodos