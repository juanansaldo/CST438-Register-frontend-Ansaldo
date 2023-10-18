import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';

function App() {
  return (
    <div className="App">
      <h2>Registration Service</h2>
        <BrowserRouter>
          <div>
            <Link to="/">Student</Link>{' '}
            &nbsp;|&nbsp;&nbsp;
            <Link id="Admin" to="/admin">Admin</Link>{' '}
            <Switch>
              <Route exact path="/" component={StudentHome} />
              <Route path="/schedule" component={ShowSchedule} />
              <Route path="/admin" component={AdminHome} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}


export default App;