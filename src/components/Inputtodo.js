import React, {useState} from "react";
const InputTodo = ()=>{
    const [description, setDescription]= useState("");
    const onSubmitform= async e =>{
        e.preventDefault();
        try{
                const body = {description}
                const token = localStorage.getItem('token');
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const response = await fetch(API_URL + "/todos", {
                    method:"POST",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(body)
            });
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                window.location = '/';
                return;
            }
                // console.log(await response.json());
                window.location='/'
                



        }catch(err){
            console.error(err.message)
        }
    };
    return(
        <>
            <h1 className="text-center mt-5">TO DO LIST</h1>
            <button className="text-right mt-2" onClick={localStorage.removeItem('token')}>logout</button>
            <form className="d-flex m-5" onSubmit={onSubmitform}>
                <input type="text" className="form-control" value={description} onChange={e=> setDescription(e.target.value)}/>
                <button className="btn btn-success">add</button>
            </form>

        </>
        
    )
}
export default InputTodo;