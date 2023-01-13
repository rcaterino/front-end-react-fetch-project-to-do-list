import React from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";

export default function Task() {
  return (
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Listado de tareas</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Tarea 1</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Tarea 2</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>Tarea 3</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>
            <Button
              floated="right"
              icon
              labelPosition="left"
              
              color="red"
            >
              <Icon name="delete" /> Eliminar Todo
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
