import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import './style/slider.module.css'
import { ROUTES } from './routes/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminContextProvider } from './context/AdminContext';
import { UserContextProvider } from './context/UserContext';
import { LogoContextProvider } from './context/LogoContext';
import { SliderContextProvider } from './context/SliderContext';
import { ServiceContextProvider } from './context/ServiceContext';
import { CategoryContextProvider } from './context/CategoryContext';
import { WorkContextProvider } from './context/WorkContext';
import { PriceContextProvider } from './context/PricesContext';
import { PersonContextProvider } from './context/PersonContext';
import { SkillContextProvider } from './context/SkillContext';
import { ProgressContextProvider } from './context/ProgressContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (

    <>

      <AdminContextProvider>
        <UserContextProvider>
          <LogoContextProvider>
            <SliderContextProvider>
              <ServiceContextProvider>
                <CategoryContextProvider>
                  <WorkContextProvider>
                    <PriceContextProvider>
                      <PersonContextProvider>
                        <SkillContextProvider>
                          <ProgressContextProvider>

                          <RouterProvider router={routes}>

                          </RouterProvider>
                          </ProgressContextProvider>
                        </SkillContextProvider>
                      </PersonContextProvider>
                    </PriceContextProvider>
                  </WorkContextProvider>
                </CategoryContextProvider>
              </ServiceContextProvider>
            </SliderContextProvider>
          </LogoContextProvider>
        </UserContextProvider>
      </AdminContextProvider>

    </>
  );
}

export default App;
