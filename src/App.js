import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Home from './pages/Home';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import { isAuthTokenContextShare } from './context/ContextShare';
import { useContext } from 'react';


function App() {
  const { isAuthToken, setisAuthToken } = useContext(isAuthTokenContextShare)

  return (
    <div>


      <Routes>
        <Route path="/project" element={<Project />}  ></Route>
        <Route path="/" element={<Home></Home>}  ></Route>
        <Route path="/register" element={<Auth register={"register"} />}  ></Route>
        <Route path="/login" element={<Auth></Auth>}  ></Route>
        <Route path="/dashboard" element={isAuthToken ? <Dashboard dashboard={'dashboard'} /> : <Home />}  ></Route>

      </Routes>

      <Footer></Footer>


    </div>
  );
}

export default App;
