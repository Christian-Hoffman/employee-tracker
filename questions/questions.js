const questions = {
    initChoice: [{
        type: 'rawlist',
        name: 'choice',
        message: 'Choose an option',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add department',
            'Add role',
            'Add an employee',
            'Update employee role',
            'Exit'
        ],
    }],
    addDepartment: [{
        type: 'input',
        name: 'name',
        message: 'What is the department name?',
    }],
    addRole: [
        {
            type: 'input',
            name: 'title',
            message: 'What is the role?',
        },
        {
            input: 'number',
            name: 'salary',
            message: 'What is the salary?',
        },
        {
            input: 'rawlist',
            name: 'department_id',
            message: 'Which department is the role in?',
            choices: []
        },
    ],
    addEmployee: [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employees first name',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employees last name',
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What is the employees role?',
            choices: []
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Who is the employees manager?',
            choices: [],
        },
    ],
    updateEmployeeRole: [
        {
            type: 'rawlist',
            name: 'id',
            message: 'What employee do you want to update?',
            choices: [],
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What role do you want to assign to the employee?',
            choices: [], 
        }
    ]
}

module.exports = questions;
