const express = require("express");
const app = express();
app.use(express.json());
const { validationResult } = require("express-validator");

const connection = require("../config.js");

const recuperarTodosTodos = (req, res, next) => {
  const sql = "SELECT * FROM todoportfolio ";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("no result");
    }
  });
};

const recuperarCompleteTodos = (req, res, next) => {
  const sql = "SELECT * FROM todoportfolio WHERE complete = 'true' ";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("no result");
    }
  });
};

const recuperarIncompleteTodos = (req, res, next) => {
  const sql = "SELECT * FROM todoportfolio WHERE complete = 'false' ";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("no result");
    }
  });
};

const crearTodo = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const error = new Error("Validation error. Check the datas");
    error.code = 422;
    return next(error);
  }

  const sql = "INSERT INTO todoportfolio SET ? ";

  const todoTaskObject = {
    task: req.body.task,
    complete: "false"
  };

  connection.query(sql, todoTaskObject, (error) => {
    if (error) throw error;
    res.json({ todo: todoTaskObject })
  });
};

const editTodo = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const error = new Error("Validation error. Check the datas");
    error.code = 422;
    return next(error);
  }

  const idTodo = req.params.id;

  const { task } = req.body;

  const sql = `UPDATE todoportfolio SET task = '${task}' WHERE id = ${idTodo}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Todo edited");
  });
};

const editCompleteTodo = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const error = new Error("Validation error. Check the datas");
    error.code = 422;
    return next(error);
  }

  const idTodo = req.params.id;

  const { complete } = req.body;

  const sql = `UPDATE todo SET complete = '${complete}' WHERE id = ${idTodo}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Todo checked");
  });
};

// delete a todo
const deleteTodo = (req, res, next) => {
  const idTodo = req.params.id;

  const sql = `DELETE FROM todoportfolio WHERE id = ${idTodo}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Todo deleted");
  });
};

const deleteCompletedTodo = (req, res, next) => {
  const sql = "DELETE FROM todoportfolio WHERE complete = 'true' ";

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Completed todos deleted");
  });
};

exports.recuperarTodosTodos = recuperarTodosTodos;
exports.recuperarCompleteTodos = recuperarCompleteTodos;
exports.recuperarIncompleteTodos = recuperarIncompleteTodos;
exports.crearTodo = crearTodo;
exports.editTodo = editTodo;
exports.editCompleteTodo = editCompleteTodo;
exports.deleteTodo = deleteTodo;
exports.deleteCompletedTodo = deleteCompletedTodo;
