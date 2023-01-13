import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Header,
  Button,
  Form,
  Divider,
  Segment,
} from "semantic-ui-react";
import Footer from "./component/Footer";
import Task from "./component/Task";

function App() {
  return (
    <div className="App">
      <Container style={{ marginTop: "3em" }}>
        <Header as="h1">To Do List App</Header>
        <Divider />
        <Segment inverted>
          <Form inverted>
            <Form.Field>
              <label>Usuario</label>
              <input placeholder="Introduce tu nombre de usuario" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Segment>

        <Divider />
        <Task />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
