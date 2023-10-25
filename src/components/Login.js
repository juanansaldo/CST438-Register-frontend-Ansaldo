import React, {useState} from 'react';
import '../App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './StudentHome';
import AdminHome from './AdminHome';
import ShowSchedule from './ShowSchedule';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(err => console.log(err));
    }

    if (isAuthenticated) {
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
    } else {
        return (
            <div className="App">
            <table>
            <tbody>
            <tr><td>
            <label htmlFor="username">UserName</label>
            </td><td>
            <input type="text" name="username" value={user.username} onChange={onChange} />
            </td></tr>
            <tr><td>
            <label htmlFor="password">Password</label>
            </td><td>
            <input type="text" name="password" value={user.password} onChange={onChange} />
            </td></tr>
            </tbody>
            </table>
            
            <br/>
            <button id="submit" onClick={login}>Login</button>
                </div>
        );
    }
}
export default Login;