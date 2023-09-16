// App wide dispatcher

import Stores from '../store';
import Actions from '../actions/appActions';

const AppDispatcher = {
	updateLoginStatus: data => {
		Stores.dispatch({ type: Actions.SET_LOGIN, payload: data });
	},
};
export default AppDispatcher;
