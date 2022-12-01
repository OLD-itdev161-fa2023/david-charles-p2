//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import BreakoutLanding from './components/Games/Breakout/BreakoutLanding';  //Error: you need JS to run this
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {

  state = {
    data: null,
    token: null,
    user: null
  }

  componentDidMount(){
    axios.get('http://localhost:5000')
    .then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) =>{
      console.error(`Error fetching data: ${error}`);
    }) 

    this.authenticateUser();
  }

  authenticateUser = () => {
    const token = localStorage.getItem('token');

    if(!token) {
      localStorage.removeItem('user');
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token' : token
        }
      }
      axios.get('http://localhost:5000/api/auth', config)
      .then((response) => {
        localStorage.setItem('user', response.data.name)
        this.setState({ user: response.data.name })
      })
      .catch((error) =>{
        localStorage.removeItem('user');
        this.setState({ user: null });
        console.error(`Error logging in: ${error}`);
      })
    }
  }

  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null, token: null });
  }

  render() {
    let {user, data} = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser
    }
    return (
      <Router>
        <div className="App">
          <header className = "App-header">
          <h1>Game Zone</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              {user ?
                <Link to="" onClick={this.logOut}>Log out</Link> :
                <Link to="/Login">Log in</Link>
              }
            </li>
          </ul>
          </header>
          <main>
            <Route exact path="/">
              <div id='homeWrapper'>
                {user ?
                  <React.Fragment>
                    <div className='black'>Hello {user}!</div>
                    <div className='black'>{data}</div>
                  </React.Fragment>:
                  <React.Fragment>
                    <p className='black'>Please Register or Login to access mind melting game action!</p>
                  </React.Fragment>
                }
                <div id='pictureBar'>
                  <figure>
                    <img src="breakout.PNG" alt='Breakout-like action!' className='homeImg'/>
                    <figcaption>Can you clear the board?  Or will you drop the ball?</figcaption>
                  </figure>
                  <figure>
                    <img src="memory.png" alt='Breakout-like action!' className='homeImg'/>
                    <figcaption>Match all the cards for the quickest time!</figcaption>
                  </figure>
                </div>
                <div>
                  {user ?
                    <React.Fragment>
                      <Link to="/BreakoutLanding"><p id='gameBtn'>Play Some Games!!!</p></Link>
                    </React.Fragment>:
                    <React.Fragment>
                    <p></p>
                    </React.Fragment>
                  }
                </div>
              </div>

            </Route>
            <Switch>
              <Route
                exact path="/Register"
                render={() => <Register {...authProps}/>} />
              <Route 
              exact path="/Login"
              render={() => <Login {...authProps} />}/>
              <Route
                  exact path="/BreakoutLanding"
                  render={()=><BreakoutLanding {...authProps}/>}/>
            </Switch>
          </main>
          
        </div>
      </Router>
    );
  }

}

export default App;
