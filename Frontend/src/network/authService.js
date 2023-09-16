// Sample service to make network call

import { API, NetworkManager } from './core';

export class AuthService {
	static async loginByUser(payload) {
		const instance = new NetworkManager(API.AUTH.LOGIN, payload);
		return await instance.httpRequest(false);
	}

	static async signUpByUser(payload) {
		const instance = new NetworkManager(API.AUTH.SIGNUP, payload);
		return await instance.httpRequest(false);
	}

	static async getTaskList({}, params) {
		const instance = new NetworkManager(API.DASHBOARD.GETTASK, {}, params);
		return await instance.httpRequest(false);
	}

	static async addTask(payload) {
		const instance = new NetworkManager(API.DASHBOARD.ADDTASK, payload);
		return await instance.httpRequest(false);
	}

	static async deleteTask(payload) {
		const instance = new NetworkManager(API.DASHBOARD.DELETETASK, payload);
		return await instance.httpRequest(false);
	}

	static async updateTask(editTask) {
		const instance = new NetworkManager(API.DASHBOARD.UPDATETASK, editTask);
		return await instance.httpRequest(false);
	}

}
