const localStorageMiddleware = store => next => action => {
    const result = next(action);
    
    switch (action.type) {
      case 'user/setUserProfile':
      case 'user/setName':
        const { firstName, lastName } = store.getState().user;
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        break;
      case 'user/resetUser':
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        break;
      default:
        break;
    }
    
    return result;
};
  
export default localStorageMiddleware;