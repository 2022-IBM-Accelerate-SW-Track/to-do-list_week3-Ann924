import { experimental_sx } from '@mui/material';
import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const taskName = "Duplicate";
  const dueDate = "05/30/2023";
  const dueDate2 = "06/30/2023";

  fireEvent.change(inputTask, { target: { value: taskName}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  fireEvent.change(inputTask, { target: { value: taskName}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);

  const occurrences = screen.getAllByText(/Duplicate/i).length;
  expect(occurrences).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputDate, { target: { value: "05/30/22"}});
  fireEvent.click(element);

  const item = screen.getByText(/You have no todo's left/i);
  expect(item).toBeInTheDocument()

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Empty Task"}});
  fireEvent.click(element);

  const item = screen.getByText(/You have no todo's left/i);
  expect(item).toBeInTheDocument()

 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Task1"}});
  fireEvent.change(inputDate, { target: { value: "05/30/22"}});
  fireEvent.click(element);

  const task = screen.getByText(/Task1/i);
  expect(task).toBeInTheDocument()

  const check = screen.getByRole('checkbox');
  fireEvent.click(check);

  const msg = screen.getByText(/You have no todo's left/i);
  expect(msg).toBeInTheDocument()

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Task1"}});
  fireEvent.change(inputDate, { target: { value: "05/30/22"}});
  fireEvent.click(element);

  fireEvent.change(inputTask, { target: { value: "Task2"}});
  fireEvent.change(inputDate, { target: { value: "10/30/22"}});
  fireEvent.click(element);

  const firstElement_color = screen.getByTestId(/Task1/i).style.background;
  const secondElement_color = screen.getByTestId(/Task2/i).style.background;

  expect(firstElement_color===secondElement_color).toBe(false);

 });
