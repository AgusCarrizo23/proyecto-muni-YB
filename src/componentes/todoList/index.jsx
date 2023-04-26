import React from "react";
import { useState } from "react";

const todoArray = [
  {
    titulo: "Titulol",
    descripcion: "Descripcion 1",
    isComplete: false,
    id: 1
  },
  {
    titulo: "Titulo 2",
    descripcion: "Descripcion 2",
    isComplete: true,
    id: 2

  }
]

const TodoList = () => {
  const [todoArray, SetTodoArray] = useState([
    {
      titulo: "Titulol",
      descripcion: "Descripcion 1",
      isComplete: false,
      id: 1
    },
    {
      titulo: "Titulo 2",
      descripcion: "Descripcion 2",
      isComplete: true,
      id: 2

    }
  ])

  const completeCount = todoArray.filter(todo => todo.isComplete === true).length
  const pendingCount = todoArray.length - completeCount
  const [formData, setFormData] = useState({ titulo: ' ', descripcion: ' ' })
  const [todoEditId, SetTodoEditId] = useState(null)

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (todoEditId != null) {
      const newTodo = [...todoArray]
      let todo = newTodo.find((todo) => todo.id === todoEditId)
      todo.titulo = formData.titulo
      todo.descripcion = formData.descripcion
      SetTodoArray(newTodo)
      SetTodoEditId(null)
      setFormData({ titulo: ' ', descripcion: ' ' })

    } else {
      if (FormData.titulo != ' ' && formData.descripcion != ' ') {
        const todo = formData
        todo.isComplete = false
        todo.id = Date.now()

        SetTodoArray([...todoArray, todo])
        setFormData({ titulo: ' ', descripcion: ' ' })
      }
    }
  }

  const deleteTodo = (id) => {
    const newTodos = todoArray.filter(todo => todo.id !== id)
    SetTodoArray(newTodos)
  }

  const toggleTodo = (id) => {
    const newTodo = [...todoArray]
    let todo = newTodo.find((todo) => todo.id === id)
    todo.isComplete = !todo.isComplete
    SetTodoArray(newTodo)
  }

  const deleteAllComplete = () => {
    const newTodo = todoArray.filter(todo => todo.isComplete === false)
    SetTodoArray(newTodo)
  }

  const setTodoEdit = (id) => {
    const todo = todoArray.find((todo) => todo.id === id)
    setFormData({ titulo: todo.titulo, descripcion: todo.descripcion })
    SetTodoEditId(id)
  }

  return (
    <div className="container w-75">
      <h1>Gestor de Tareas</h1>
      <form className="input-group shadow rounded p-3 d-flex align-items-center justify-content-between" onSubmit={addTodo} >
        <div>
          <label>Titulo</label>
          <input className="form-control"
            type="text"
            name="titulo"
            placeholder="Titulo"
            value={formData.titulo}
            required
            onChange={handleChange} />
        </div>
        <div>
          <label>Descripcion</label>
          <input className="form-control"
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            required
            onChange={handleChange} />
        </div>
        <input className="btn btn-primary h-100 mt-4" type="submit" value="Agregar" />
      </form>
      <div className="shadow rounded p-3 mt-5 w-100  d-flex align-items-center justify-content-between list-group-item">
        <h5 className="text-center">Listado</h5>
        <button className="btn btn-danger" onClick={deleteAllComplete}>Desechar tareas completadas</button>
      </div>
      {
        todoArray.map((todo) =>
          <div key={todo.id} className="d-flex align-items-center list-group-item mt-5">
            <input type="checkbox"
              className="form-check-input mx-2"
              checked={todo.isComplete}
              onChange={() => toggleTodo(todo.id)}
            />
            <p className={`p-0 m-0 flex-grow-1 ${todo.isComplete ? 'text-decoration-line-through' : ''}`}>
              {todo.titulo}
              <br />
              <span className="text-muted">{todo.descripcion}</span>
            </p>
            {todo.isComplete && <span className="badge bg-success">Completada</span>}
            <button className="btn btn-warning mx-1" onClick={() => setTodoEdit(todo.id)} >editar</button>
            <button className="btn btn-danger mx-1" onClick={() => deleteTodo(todo.id)}>desechar</button>
          </div>
        )
      }
      <div className="list-group-item mt-5">
        <span className="fw-light font menospace"> Total de tareas: {todoArray.length} ,  completadas: {completeCount}, pendientes: {pendingCount}</span>
      </div>
    </div>
  );
};

export default TodoList;