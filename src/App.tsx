import HeaderLayout from './layouts/HeaderLayout';
import TasksFeature from './features/TasksFeature';
import { ErrorSnackbar } from './components/common/ErrorSnackBar';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center bg-gray-100 h-dvh">
        <HeaderLayout />
        <TasksFeature />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
