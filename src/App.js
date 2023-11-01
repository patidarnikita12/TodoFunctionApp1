import { useState } from "react"

const App = ()=>
{
  const [todo,setTodo] = useState([])
  const [editingFlage,setEditing] = useState(-1)
  function addTodo()
  {
    console.log("-----Addtodo---")
    let tempTodo = document.getElementById("todoInput").value
    console.log("tempTodo: "+tempTodo)
    
    if (todo.length>0)
    {
      addToArray(todo[todo.length-1].id+1,tempTodo,false)
    }
    else
    { 
      addToArray(0,tempTodo,false)
    }
   
    document.getElementById("todoInput").value = ""
   
  }
  function mock()
  { 
    if (todo.length>0)
    {
      
      addToArray(todo[todo.length-1].id+1,"Todo 1",true)
      addToArray(todo[todo.length-1].id+1,"Todo 2",false)
      addToArray(todo[todo.length-1].id+1,"Todo 3",true)
    }
    else
    {
       addToArray(0,"Todo 1",false)
       addToArray(todo[todo.length-1].id+1,"Todo 2",true)
       addToArray(todo[todo.length-1].id+1,"Todo 3",false)
       addToArray(todo[todo.length-1].id+1,"Todo 4",true)
    }
  }

  

    
  
  function addToArray(id,text,completed)
  {
    let tempTodoObject ={
      id :id,
      text:text,
      completed:completed
      }
    todo.push(tempTodoObject)
    console.log("After push")
    console.log(todo)
    setTodo([...todo])
    
    

  }
  
  function deleteTodo(id)
  {
    console.log("--------deletetodo-----")
    console.log("id: "+id)
    console.log(todo)
    let tempTodo = todo.filter(element=>
    {
      return element.id != id
    })
    console.log(tempTodo)
    setTodo([...tempTodo])
  }
  
  function checkListener(id)
  {
    console.log("----Checklistener--")
    todo.map(element=>
      {
        if (element.id == id)
        {
          element.completed = ! element.completed
        }
        return element

      })
      console.log(todo)
      setTodo([...todo])
  }
  
  function editTodo(id)
  {
    console.log("-----------editTodo-----")
    console.log("id: "+id)
    setEditing(id)
    
    console.log(todo)
    setTodo([...todo])
    
  }

  function updateTodo()
  {
    console.log("-------Update todo-----")
    console.log("editingFlage: "+ editingFlage)
    let tempTodo = todo.filter(element=>
    {
      if(element.id == editingFlage)
      {
        element.text = document.getElementById("editTodo").value

      }
      return element
    })
    setTodo([...tempTodo])
  }
  

   return <div>
      <h1>To-Do Application</h1>
      <input type ="text" placeholder="Enter todo here" id ="todoInput"></input>
      <button onClick={()=>addTodo()}>Add Todo</button>
      <button onClick={()=>mock()}>Mock</button>
      {
        todo.map(element=>
        {
          return <div>
                   {
                   element.completed?
                   // completed todo
                   <div>
                    <input type="checkbox" onClick={()=>checkListener(element.id)} checked />
                    <s>{element.text+" "}</s>
                   {/* <button onClick={()=>deleteTodo(element.id)}>Delete</button> */}
                   </div>:
                   //* incompleted todo 
                    (element.id == editingFlage?
                    <div>  
                       {/* editing frontend */}
                  
                     <input type="checkbox" onClick={()=>checkListener(element.id)} ></input>
                     <input type="text" value={element.text} placeholder="Update Todo here" id="editTodo"/>
                   
                     <button onClick={()=>deleteTodo(element.id)} >Delete</button>
                     <button onClick={()=>updateTodo()}>Save Todo</button>
          
                    </div>
                    :
                     //default frontend
                    <div>  
                    
                  
                      <input type="checkbox" onClick={()=>checkListener(element.id)} ></input>
         
                      {element.text+" "}
                      <button onClick={()=>deleteTodo(element.id)} >Delete</button>
                      <button onClick={()=>editTodo(element.id)}>Edite</button>
          
                    </div>
                    )
                  }
                  </div>
        })
      }
    </div>
}

export default App;