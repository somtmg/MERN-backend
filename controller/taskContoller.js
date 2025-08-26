const asyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")
const User = require("../models/userModel")

const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })
  res.status(200).json(tasks)
})
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please enter a task")
  }
  const tasks = await Task.create({ text: req.body.text, user: req.user.id })
  res.status(200).json(tasks)
})
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (!task) {
    res.status(400)
    throw new Error("Task Not Found For Update")
  }
  // check if user exists
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("No such user found")
  }
  // check if task belong to the user
  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error("User is not authorized to update")
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedTask)
  //res.status(200).json({ message: `Updated Task ${req.params.id}` })
})
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (!task) {
    res.status(400)
    throw new Error("Task Not Found For Deletion")
  }
  // check if user exists
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }
  // check if task belong to the user
  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error("User is not authorized to delete")
  }
  await Task.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: `Deleted Task ${req.params.id}` })
})

module.exports = { getTask, setTask, updateTask, deleteTask }
