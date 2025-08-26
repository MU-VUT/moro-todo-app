import type { FC, ReactElement } from 'react';
import TasksTable from '../components/TasksTable/TasksTable';
import NewTask from '../components/NewTask/NewTask';

const TasksFeature: FC = (): ReactElement => {
  return (
    <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl mx-auto mt-8 px-4 sm:px-0 flex flex-col gap-4">
      <NewTask />
      <TasksTable />
    </div>
  );
};

export default TasksFeature;
