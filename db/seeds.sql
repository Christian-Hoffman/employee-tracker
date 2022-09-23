INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 130000, 1),
        ('Sales Associate', 90000, 1),
        ('Senior Engineer', 200000, 2),
        ('Junior Engineer', 160000, 2),
        ('Accounting Manager', 140000, 3),
        ('Accountant', 100000, 3),
        ('Lawyer', 240000, 4),
        ('Legal Associate', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Rogue", "Amendiares", 1, null),
        ("Panam", "Palmer", 2, 1),
        ("Viktor", "Vector", 3, null),
        ("Judy", "Alvarez", 4, 3),
        ("Alt", "Cunningham", 4, 3),
        ("Johnny", "Silverhand", 5, null),
        ("Adam", "Smasher", 6, 5),
        ("Goro", "Takemura", 7, null),
        ("Jackie", "Wells", 8, 7),
        ("River", "Ward", 8, 7);

