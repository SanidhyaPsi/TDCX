import {tasksData, sampleData} from "../utils/data"
const initialState = {
    allTasks: tasksData,
    data: sampleData,
    isAuthenticated: false,
    user: null
  };
  const reducer = (state=initialState, action) => {
    switch(action.type) {
      case 'LOAD':
        return {
          ...state,
        };
      case "AUTH_SUCCESS":
      localStorage.setItem("userData", JSON.stringify(action.payload))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
      case "LOGOUT":
      localStorage.removeItem("userData")
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
      default:
        return state;
    }
  };
  export default reducer;