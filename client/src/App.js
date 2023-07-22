import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ROUTES } from './routes/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminContextProvider } from './context/AdminContext';
import { UserContextProvider } from './context/UserContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (
    
    <>
     
      <AdminContextProvider>
        <UserContextProvider>
      <RouterProvider router={routes}>

      </RouterProvider>
      </UserContextProvider>
      </AdminContextProvider>
     
    </>
  );
}

export default App;
