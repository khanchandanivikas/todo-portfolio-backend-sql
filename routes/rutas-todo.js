const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const controladorTodo = require("../controllers/controlador-todo");

router.get("/", controladorTodo.recuperarTodosTodos);

router.get("/complete", controladorTodo.recuperarCompleteTodos);

router.get("/incomplete", controladorTodo.recuperarIncompleteTodos);

router.post("/", [check("task").not().isEmpty()], controladorTodo.crearTodo);

router.put("/task/:id", [check("task").not().isEmpty()], controladorTodo.editTodo);

router.put("/complete/:id", [check("complete").not().isEmpty()], controladorTodo.editCompleteTodo);

router.delete("/:id", controladorTodo.deleteTodo);

router.delete("/delete/deleteCompleted", controladorTodo.deleteCompletedTodo);

module.exports = router;
