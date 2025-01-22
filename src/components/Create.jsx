import React, {useState} from 'react'
import axios from 'axios';


function Create(){
    const [task, setTask] = useState()
    const handleAdd =() =>{
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div 
    style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '16px' }}>
        <input type='text' placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}
         style={{
            width: '250px',
            padding: '8px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
        }}/>
        <button 
         style={{
            borderRadius: '8px',
            backgroundColor: '#14b8a6',
            padding: '8px 16px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
        }}
        type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create