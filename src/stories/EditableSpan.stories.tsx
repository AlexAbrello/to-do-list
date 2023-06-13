import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {AddItemForm} from "../AddItemForm";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import React from "react";
import {Task} from "../Task";
import {TaskType} from "../Todolist";
import {EditableSpan} from "../EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Start value is empty string',
    },
    onChange: {
      description: 'Set new value'
    }
  },
  args: {
    value: 'HTML',
    onChange: action('Change value')
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};
