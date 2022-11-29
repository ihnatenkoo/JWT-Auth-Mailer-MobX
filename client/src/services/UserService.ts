import { AxiosResponse } from 'axios';
import $api from '../http';
import { IUser } from '../types/IUser';

export class UserService {
	static async fetchUsers(): Promise<AxiosResponse<Array<IUser>>> {
		return $api.get<Array<IUser>>('/auth/users');
	}
}
