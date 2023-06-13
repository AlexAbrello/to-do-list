import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {AddItemForm} from "../AddItemForm";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import React from "react";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDone: Story = {
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
    task: {id: 'qwer123', isDone: false, title: 'JS'},
    todolistId: 'qwerty'
  }
};

export const TaskIsDone: Story = {
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
    task: {id: 'qwer123', isDone: true, title: 'JS'},
    todolistId: 'qwerty'
  }
};
