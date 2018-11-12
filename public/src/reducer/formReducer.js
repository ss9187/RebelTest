export const formReducer = function(state = {}, action) {
    switch (action.type) {
      case "SUCCESS":
        return { ...state, success: action.payload, error: false};
      case "RESET":
        return {...state, success:false, error:false};
      case "ERROR":
          return {...state, error:true, success:false}
      default:
        return state;
    }
  };