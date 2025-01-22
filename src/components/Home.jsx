import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                todo.done = !todo.done;
            }
            return todo;
        });

        setTodos(updatedTodos);

        axios.put(`http://localhost:3001/update/${id}`, { done: !todos.find(todo => todo._id === id).done })
            .then(result => console.log('Task updated'))
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}><h2>No Records yet</h2></div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '80%',
                        maxWidth: '500px',
                        backgroundColor: '#1c1c1c',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                    }}
                    >
                        <div style={{ cursor: 'pointer' }} onClick={() => handleEdit(todo._id)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill style={{ color: 'green', fontSize: '18px' }} />
                            ) : (
                                <BsCircleFill style={{ color: 'gray', fontSize: '18px' }} />
                            )}
                        </div>
                        <div className={todo.done ? "line_through" : ""}>
                            {todo.task}
                        </div>
                        <div className="trash">
                            <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
