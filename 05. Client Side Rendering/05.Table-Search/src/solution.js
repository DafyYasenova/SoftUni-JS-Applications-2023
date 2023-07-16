import { render } from "../../node_modules/lit-html/lit-html.js";
import { loadStudents } from "./api.js";
import { search } from "./search.js";
import {studentTemplate} from './template.js';


const container = document.querySelector('.container tbody');

const data = await loadStudents();

let template = studentTemplate(Object.values(data));

render(template, container);

const searchBtn = document.querySelector('#searchBtn')
searchBtn.addEventListener('click', search);

