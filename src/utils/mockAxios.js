import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { paths, buttons, employees } from "./db";

// Create a new instance of MockAdapter on the default axios instance
const mock = new MockAdapter(axios);

// arguments for reply are (status, data, headers)
mock.onGet("/paths").reply(200, {
  paths: paths,
});

mock.onGet("/buttons").reply(200, {
  buttons: buttons,
});

mock.onGet("/employees").reply(200, {
  employees: employees,
});

export default axios;
