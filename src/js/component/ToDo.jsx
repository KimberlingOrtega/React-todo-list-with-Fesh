import React, { useEffect, useState } from "react";
import Checkbox from "./checkbox.jsx";

const ToDo = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [isShown, setIsShown] = useState(-1);
  
  const handleChange = async (checked, position,label) => {
    console.log(checked, "linea 10");
    let newTaskList = taskList[position]
    newTaskList.label=label;
    newTaskList.done=checked;
    taskList[position] = newTaskList;
    console.log(taskList);
    let response = await fetch(
      `https://assets.breatheco.de/apis/fake/todos/user/KimberlingOrtega`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskList),
      }
    );
    if (response.ok) {
      let body = await response.json();
      console.log(body);
      getUserToDo();
    }
  };

  const handlertask = (event) => {
    setTask(event.target.value);
  };

  const handlerKeyPress = async (event) => {
    // event.preventDefault();

    if (event.key == "Enter" && task != "") {
      let newTaskList = [...taskList, { label: task, done: false }];
      // setTaskList([...taskList, task]);
      let response = await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/KimberlingOrtega`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskList),
        }
      );
      if (response.ok) {
        let body = await response.json();
        console.log(body);
        getUserToDo();
      }
      setTask("");
    }
  };
  const handlerButtomDelete = async (indexid) => {
    let updatedTaskList = taskList.filter((tarea, index) => index != indexid);
    let response = await fetch(
      `https://assets.breatheco.de/apis/fake/todos/user/KimberlingOrtega`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTaskList),
      }
    );
    if (response.ok) {
      let body = await response.json();
      console.log(body);
      getUserToDo();
    }
  };

  const createUser = async () => {
    let response = await fetch(
      `https://assets.breatheco.de/apis/fake/todos/user/KimberlingOrtega`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      }
    );
    if (response.ok) {
      let body = await response.json();
      getUserToDo();
    } else if (response.status == 400) {
      console.log("el usuario ya existe");
      getUserToDo();
    }
  };
  const getUserToDo = async () => {
    let response = await fetch(
      `https://assets.breatheco.de/apis/fake/todos/user/KimberlingOrtega`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      let body = await response.json();
      setTaskList(body);
      console.log(body);
    }
    if (response.status == 404) {
      createUser();
    }
  };
  useEffect(() => {
    getUserToDo();
  }, []);
  return (
    <div className="row">
      <div className="title d-flex justify-content-center pt-2">
        <h1 className="title-1">Lista de tareas</h1>
      </div>
      <div className="col-3"></div>
      <div className="col-6">
        <div className="Card" id="card">
          <div className="form-floating mb-3">
            <input
              onChange={handlertask}
              value={task}
              onKeyDown={handlerKeyPress}
              type="text"
              className="form-control c-kim "
              id="floatingInput"
              placeholder="Tarea por hacer"
              style={{ color: "white" }}
            />

            <label htmlFor="floatingInput">Tarea por hacer</label>
            <div className="task"></div>
            {taskList.map((tarea, i) => {
              return (
                <>
                <span
                  className="d-flex justify-content-between py-2 px-3 g-tareas text-white my-1
              rounded-1 border border border-info align-items-center"
                  key={`s-${i}`}
                  onMouseEnter={() => {
                    setIsShown(i);
                  }}
                  onMouseLeave={() => {
                    setIsShown(-1);
                  }}
                >
                  <div>
                  <h2 key={i}>{tarea.label}</h2>
                    
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                  <Checkbox 
                  handleChange={handleChange}
                  position={i} 
                  label={tarea.label}
                  isDone={tarea.done} />
                  
                   <i className={`${isShown == i ? "" : "visually-hidden" } fas fa-minus-circle mx-2`}
                   key={`p-${i}`}
                      onClick={() => {
                        handlerButtomDelete(i);
                      }} >
                    
                  </i> 
                  </div>
                 
                  
                  {/* {isShown == i && (
                    <i
                      className="fas fa-minus-circle ms-2"
                      key={`p-${i}`}
                      onClick={() => {
                        handlerButtomDelete(i);
                      }}
                    ></i>
                  )} */}
                  </span>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
