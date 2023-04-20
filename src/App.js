import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import { DefaultLayout,AdminLayout } from './components/Layout';
import {publicRoutes,privateRoutes, privateUserRoutes} from './routes';
import { AuthState } from './store/AuthProvider';


function App() {
  const {user} = AuthState();
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.Component;
            const Layout = DefaultLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            }/>
          })}
          {user&&user!==null&&privateUserRoutes.map((route,index) => {
            const Page = route.Component;
            const Layout = DefaultLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          })}
          {user&&user.user.role==='admin'&&user!==null&&privateRoutes.map((route,index) => {
            const Page = route.Component;
            const Layout = AdminLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            }/>
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
