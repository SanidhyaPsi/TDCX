// import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import Dashboard from "./components/dashboard"
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("userData"))){
      dispatch({ type: "AUTH_SUCCESS", payload: JSON.parse(localStorage.getItem("userData")) });
    }
  })
  return (
    <div>
      { !props.isAuthenticated ? 
        <Login/>
        :
        <Dashboard/>
      }
    </div>
  )
}
const mapStateToProps = (state, props) => {
  return{
    isAuthenticated: state.isAuthenticated
  }
};

export default connect(mapStateToProps)(App)