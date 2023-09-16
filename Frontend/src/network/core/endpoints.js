// List all endpoints here
// @ts-check
import { Endpoint } from './apiModel';
import { HTTP_METHODS } from './httpMethods';


export const API = {
	AUTH: {
		LOGIN: new Endpoint('/login', HTTP_METHODS.POST),
		SIGNUP: new Endpoint('/register', HTTP_METHODS.POST),
	},
	DASHBOARD : {
		GETTASK: new Endpoint('/getTasks', HTTP_METHODS.GET),
		ADDTASK: new Endpoint('/addTask', HTTP_METHODS.POST),
		DELETETASK: new Endpoint('/deleteTask', HTTP_METHODS.POST),
		UPDATETASK: new Endpoint('/updateTask', HTTP_METHODS.POST),
	}
};
