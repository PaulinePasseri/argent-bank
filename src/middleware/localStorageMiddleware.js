const localStorageMiddleware = store => next => action => {
    const result = next(action);
    console.log('Dispatching action:', action.type);
  
    try {
      switch (action.type) {
        case 'user/setUserProfile':
        case 'user/setUserName': { 
          const { userName } = store.getState().user; 
          if (userName) {
            localStorage.setItem('userName', userName); 
            console.log('Saved userName to localStorage:', userName);
          }
          break;
        }
        case 'user/resetUser':
          localStorage.removeItem('userName');
          console.log('Removed user data from localStorage');
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