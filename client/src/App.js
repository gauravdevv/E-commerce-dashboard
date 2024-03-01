
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Privatecomponent from './components/Privatecomponent';
import Productlist from './components/Productlist';
import Signup from './components/Signup';
import Updateproduct from './components/Updateproduct';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<Privatecomponent/>}>
          <Route path="/" element={<Productlist/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update" element={<Updateproduct/>} />
          <Route path="/profile" element={<h1>profile routes</h1>} />
          <Route path="/logout" element={<h1>logout routes</h1>} />
          </Route>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />


        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
