import {useEffect,useState} from 'react';
import axios from 'axios';

const API_URL="https://fakerestapi.azurewebsites.net/api/v1/Activities";

function TodoApp()
{
    const [todos,setTodos]=useState([]);
    const [newTodo,setNewTodo]=useSate("");

    useEffect(()=>{
        axios.get(API_URL)
        .then(res=>setTodos(res.data))
        .catch(err=>console.error(err));
    },[]);

    const addTodo=()=>{
        axios.post(API_URL,{title:newTodo,completed:false})
        .then(res=>setTodos([...todos,res.data]))
        .catch(err=>console.error(err));
        setNewTodo("");
    };
    return (
        <div>
            <h2> TodoList</h2>
            <input value ={newTodo} onChange={(e)=>
                setNewTodo(e.target.value)}/>
                <button onClick={addTodo}> Add Todo</button>
                <ul>
                    {
                        todos.map(todo=>(
                            <li key={todo.id}>
                                <p>{todo.title}</p>
                                <p>{todo.dueDate}</p>
                            
                            
                            </li>
                        ))
                    }
                </ul>
            
        </div>
    )
}