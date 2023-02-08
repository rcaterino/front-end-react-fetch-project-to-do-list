import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Header,
  Button,
  Form,
  Divider,
  Segment,
  List,
} from "semantic-ui-react";
import Footer from "./component/Footer";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  let user = "rcaterino";

  useEffect(() => {
    get(user);
  }, []);

  const createUser = () => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((response) => {
        if (response.ok) {
          get();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const get = (user) => {
    console.log(`usuario recibido en get: ${user}`);
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`)
      .then((resp) => {
        console.log(`respuesta recibida en get: ${resp.ok}`);
        if (!resp.ok) {
          createUser();
        }
        return resp.json();
      })
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const put = (aux) => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      method: "PUT",
      body: JSON.stringify(aux),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          get(user)
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addToDo = (input) => {
    let aux = [...toDoList];
    const newToDo = {};
    newToDo.label = input;
    newToDo.done = false;
    aux.push(newToDo);
    setToDoList([...toDoList, newToDo]);
    put(aux);
    get(user);
  };
  const deleteTask = (element) => {
    if (toDoList.length === 1) {
      nukeToDo();
    } else if (toDoList.length > 1) {
      let aux = toDoList.filter((el) => el !== element);
      setToDoList(aux);
      put(aux);
      get(user);
    }
  };

  const nukeToDo = () => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        createUser();
      }
    });
  };

  const isCompleted = (i) => {
    let updatedList = toDoList.map((item, j, arr) => {
      if (j === i && item.label === arr[i].label) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setToDoList(updatedList);
    put(updatedList);
  };

  return (
    <div className="App">
      <Container style={{ marginTop: "3em" }}>
        <Segment inverted>
          <Header as="h1">To Do List App</Header>
        </Segment>
        <Divider />
        <Segment inverted>
          <Form inverted>
            <Form.Field>
              <label>Nueva Tarea</label>
              <input
                placeholder="Escriba aqui su nueva tarea"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value.trim()) {
                      addToDo(e.target.value);
                      setInputValue("");
                    }
                  }
                }}
              />
            </Form.Field>
            <Button
              type="submit"
              color="blue"
              onClick={(e) => {
                addToDo(inputValue);
                setInputValue("");
              }}
            >
              Agregar
            </Button>
          </Form>
        </Segment>
        <Segment>
          <List divided verticalAlign="middle">
            {toDoList.map((elemento, i) => (
              <List.Item key={i}>
                <List.Content floated="right">
                  <Button
                    color="red"
                    floated="right"
                    className="trash"
                    onClick={() => {
                      deleteTask(elemento);
                    }}
                  >
                    Eliminar tarea
                  </Button>
                </List.Content>
                <List.Content>{elemento.label}</List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
