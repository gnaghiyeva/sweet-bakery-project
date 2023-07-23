import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ROUTES } from './routes/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminContextProvider } from './context/AdminContext';
import { UserContextProvider } from './context/UserContext';
import { LogoContextProvider } from './context/LogoContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (

    <>

      <AdminContextProvider>
        <UserContextProvider>
          <LogoContextProvider>
            <RouterProvider router={routes}>

            </RouterProvider>
          </LogoContextProvider>
        </UserContextProvider>
      </AdminContextProvider>

    </>
  );
}

export default App;
