const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const questions = require('./questions/questions');
const path = require('path');
const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const prompt = inquirer.createPromptModule();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const showAllEmployees = () => {
    db.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name,
    role.title AS job_title,
    department.name AS department,
    role.salary AS salary,
    employee.manager_id AS manager_id FROM employee,
    role,
    department WHERE department.id = role.department_id AND role.id = employee.role_id;
    `, (err, data) => {
      if (err) console.log(err);
      console.table(data);
      showOptions();
    });
};


const showAllDepartments = () => {
    db.query(`SELECT department.id, department.name AS department FROM department`,
    (err, data) => {
        if (err) console.log(err);
        console.table(data);
        showOptions();
    });
};

const showAllRole = () => {
    db.query(`SELECT role.id, title, salary, name AS department_name FROM role INNER JOIN department WHERE role.department_id = department.id`,
    (err, data) => {
        if (err) console.log(err);
        console.table(data);
        showOptions();
    });
};

const addDepartment = async () => {
    const input = await prompt(questions.addDepartment);
    db.query('INSERT INTO department SET ?', input, (err) => {
        if (err) console.log(err);
        console.log(`Added a ${input.name}`);
        showOptions();
    });
};

const addRole = () => {
    db.query('SELECT name, id AS value FROM department', async (err, answers) => {
        if(err) console.log(err);
        questions.addRole[2].choices = answers;
        const input = await prompt(questions.addRole);
        db.query('INSERT INTO role SET ?', input, (err) => {
            if(err) console.log(err);
            console.log(`Added ${input.title}`);
            showOptions();
        });
    });
};

const addEmployee = () => {
    db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee WHERE manager_id IS NULL`,
    (err, managerChoices) => {
        if (err) console.log(err);
        const answers = [...managerChoices, { name: 'none', value: 0 }];
        questions.addEmployee[3].choices = answers;
        db.query('SELECT title AS name, id AS value FROM role', async (err, chooseRole) => {
            if (err) console.log(err);
            questions.addEmployee[2].choices = chooseRole;
            const input = await prompt(questions.addEmployee);
            if (input.manager_id === 0) delete input.manager_id;
            db.query('INSERT INTO employee SET ?', input, (err) => {
                if (err) console.log(err);
                console.log('New employee added');
                showOptions();
            });
        });
    });
};

const updateEmployeeRole = () => {

};

const showOptions = async () => {
    const answers = await prompt(questions.initChoice);
    console.log(answers.choice);
    switch(answers.choice) {
        case 'View all employees': {
            return showAllEmployees();
        }
        case 'View all departments': {
            return showAllDepartments();
        }
        case 'View all roles': {
            return showAllRole();
        }
        case 'Add department': {
            return addDepartment();
        }
        case 'Add role': {
            return addRole();
        }
        case 'Add an employee': {
            return addEmployee();
        }
        case 'Update employee role': {
            return updateEmployeeRole();
        }
        case 'Exit': {
            return process.exit();
        }
    }
};

showOptions();

// showAllEmployees();

// showAllDepartments();

// showAllRole();

// addDepartment();

// addRole();

// addEmployee();

// updateEmployeeRole();