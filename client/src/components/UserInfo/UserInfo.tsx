import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { UserService } from '../../services/UserService';
import { IUser } from '../../types/IUser';

const UserInfo = () => {
	const [users, setUsers] = useState<IUser[] | []>([]);
	const {
		store,
		store: { user },
	} = useContext(Context);

	const getUsers = async () => {
		try {
			const response = await UserService.fetchUsers();
			setUsers(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div>{user.email}</div>
			<div>{`Activated: ${user.isActivated}`}</div>
			<button
				onClick={() => getUsers()}
				style={{ display: 'block', marginBottom: '10px' }}
			>
				Show users
			</button>
			{!!users.length && (
				<ul>
					{users.map((u) => (
						<li key={u.email}>{u.email}</li>
					))}
				</ul>
			)}
			<button onClick={() => store.logout()}>Logout</button>
		</div>
	);
};

export default observer(UserInfo);
