import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {AddItemForm} from "../AddItemForm";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import React from "react";

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button clicked inside form')
  }
};

export const AddItemFormErrorStory: Story = {
  render: (args => <div>
    <TextField variant="outlined"
               error={true}
               value={''}
               onChange={() => {}}
               onKeyPress={() => {}}
               label="Title"
               helperText={"Title is required"}
    />
    <IconButton color="primary" onClick={() => args.addItem('Button clicked inside form')}>
      <AddBox />
    </IconButton>
  </div>)
}