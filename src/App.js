import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from './Pages/Home';
import AddNote from './Pages/AddNote';
import SingleNote from './Pages/SingleNote';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<AddNote/>} />
        <Route path='/single-note/:id' element={<SingleNote/>} />
      </Routes>
    </div>
  );
}

export default App;
