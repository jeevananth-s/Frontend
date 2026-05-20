export const sqlLessons = {
  ddl: [
    {
      id: "ddl-1",
      title: "CREATE TABLE",
      definition: "The CREATE TABLE statement is used to create a new table in a database.",
      syntax: "CREATE TABLE table_name (\n  column1 datatype,\n  column2 datatype,\n  ...\n);",
      example: "CREATE TABLE Employees (\n  ID int,\n  Name varchar(255),\n  Department varchar(255),\n  Salary int\n);",
      explanation: "This command defines a new table 'Employees' with four columns: ID, Name, Department, and Salary, each with their respective data types."
    },
    {
      id: "ddl-2",
      title: "ALTER TABLE",
      definition: "The ALTER TABLE statement is used to add, delete, or modify columns in an existing table.",
      syntax: "ALTER TABLE table_name\nADD column_name datatype;",
      example: "ALTER TABLE Employees\nADD Email varchar(255);",
      explanation: "This command adds a new column 'Email' of type varchar(255) to the existing 'Employees' table."
    },
    {
      id: "ddl-3",
      title: "DROP TABLE",
      definition: "The DROP TABLE statement is used to drop an existing table in a database.",
      syntax: "DROP TABLE table_name;",
      example: "DROP TABLE Employees;",
      explanation: "This command completely removes the 'Employees' table and all of its data from the database. Use with caution!"
    }
  ],
  dml: [
    {
      id: "dml-1",
      title: "INSERT INTO",
      definition: "The INSERT INTO statement is used to insert new records in a table.",
      syntax: "INSERT INTO table_name (column1, column2, ...)\nVALUES (value1, value2, ...);",
      example: "INSERT INTO Employees (ID, Name, Department, Salary)\nVALUES (1, 'John Doe', 'Engineering', 75000);",
      explanation: "This command adds a new row to the Employees table with the specified values."
    },
    {
      id: "dml-2",
      title: "UPDATE",
      definition: "The UPDATE statement is used to modify the existing records in a table.",
      syntax: "UPDATE table_name\nSET column1 = value1, column2 = value2, ...\nWHERE condition;",
      example: "UPDATE Employees\nSET Salary = 80000\nWHERE ID = 1;",
      explanation: "This command increases the salary to 80000 for the employee whose ID is 1. Without the WHERE clause, all salaries would be updated."
    },
    {
      id: "dml-3",
      title: "DELETE",
      definition: "The DELETE statement is used to delete existing records in a table.",
      syntax: "DELETE FROM table_name WHERE condition;",
      example: "DELETE FROM Employees WHERE ID = 1;",
      explanation: "This command removes the record for the employee with ID 1. If WHERE is omitted, all records are deleted."
    }
  ],
  dql: [
    {
      id: "dql-1",
      title: "SELECT (All Columns)",
      definition: "The SELECT statement is used to select data from a database. The * selects all columns.",
      syntax: "SELECT * FROM table_name;",
      example: "SELECT * FROM Employees;",
      explanation: "This retrieves every column and every row from the Employees table."
    },
    {
      id: "dql-2",
      title: "SELECT (Specific Columns)",
      definition: "You can specify exactly which columns you want to retrieve.",
      syntax: "SELECT column1, column2 FROM table_name;",
      example: "SELECT Name, Department FROM Employees;",
      explanation: "This retrieves only the Name and Department columns for all records in the Employees table."
    },
    {
      id: "dql-3",
      title: "SELECT with WHERE",
      definition: "The WHERE clause is used to filter records that fulfill a specified condition.",
      syntax: "SELECT column1, column2 FROM table_name\nWHERE condition;",
      example: "SELECT * FROM Employees\nWHERE Department = 'Engineering';",
      explanation: "This retrieves all information but only for employees who work in the Engineering department."
    }
  ]
};
