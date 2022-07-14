import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterForm from './views/RegisterForm'
import LoginForm from './views/LoginForm';
import Home from './views/Home';
import JobofferForm from './views/JobofferForm';
import Joboffers from './views/Joboffers';
import Joboffer from './views/Joboffer';
import EdiJoboffer from './views/EditJoboffer';
import Users from './views/Users';
import User from './views/User';
import NotFound from './views/NotFound';
import Feed from './views/Feed';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>;
          <Route path='/joboffers' element={<Joboffers/>}/>
          <Route path='/joboffers/create' element={<JobofferForm/>}/>
          <Route path='/joboffers/edit/:id' element={<EdiJoboffer/>}/>
          <Route path="/job/:id" element={<Joboffer/>}/>;
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/user/:id' element={<User/>}/>
          <Route path='/not-found' element={<NotFound/>}/>
          <Route path='/home' element={<Feed/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
