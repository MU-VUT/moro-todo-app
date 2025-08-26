import { useState, type FC, type ReactElement } from 'react';
import { Check, Delete, Edit } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, TextField } from '@mui/material';
import type { Task } from '../../types/task';
import {
  useDeleteTaskMutation,
  useUpdateTaskCompletionMutation,
  useUpdateTaskMutation,
} from '../../services/apiService';

type TableItemProps = {
  task: Task;
};

const TableItem: FC<TableItemProps> = ({ task }): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskCompletion] = useUpdateTaskCompletionMutation();

  const onDelete = async () => {
    await deleteTask(task.id);
  };

  const onSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed || trimmed === task.text) {
      setIsEditing(false);
      setEditText(task.text);
      return;
    }

    try {
      await updateTask({ id: task.id, text: trimmed }).unwrap();
    } finally {
      setIsEditing(false);
    }
  };

  const onToggle = async () => {
    await updateTaskCompletion({ id: task.id, completed: !task.completed });
  };

  return (
    <ListItem className="flex items-start gap-2">
      <Checkbox
        checked={task.completed}
        onChange={onToggle}
        className="mt-1"
        disabled={isEditing}
      />

      <div className="flex-1 whitespace-normal break-words">
        {isEditing ? (
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            fullWidth
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSaveEdit();
              } else if (e.key === 'Escape') {
                setIsEditing(false);
                setEditText(task.text);
              }
            }}
          />
        ) : (
          <span
            className={`${task.completed ? 'line-through text-gray-400' : ''}`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex gap-1 shrink-0">
        {isEditing ? (
          <IconButton onClick={onSaveEdit}>
            <Check />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete}>
              <Delete />
            </IconButton>
          </>
        )}
      </div>
    </ListItem>
  );
};

export default TableItem;
