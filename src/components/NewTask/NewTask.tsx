import { TextField, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, type FC, type FormEvent } from 'react';
import { useAddTaskMutation } from '../../services/apiService';

const NewTask: FC = () => {
  const [text, setText] = useState('');
  const [addTask] = useAddTaskMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    await addTask({ text: trimmed, completed: false });
    setText('');
  };

  return (
    <Paper className="p-2">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="Add a new task"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <AddIcon />
          </IconButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default NewTask;
