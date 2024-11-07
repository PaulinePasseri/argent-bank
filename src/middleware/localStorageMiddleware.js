const localStorageMiddleware = store => next => action => {
    const result = next(action);
    try {
      switch (action.type) {
        case 'user/setUserProfile':
        case 'user/setUserName': { 
          const { userName } = store.getState().user; 
          if (userName) {
            localStorage.setItem('userName', userName); 
          }
          break;
        }
        case 'user/resetUser':
          localStorage.removeItem('userName');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error in localStorageMiddleware:', error);
    }
    
    return result;
  };
  
  export default localStorageMiddleware;