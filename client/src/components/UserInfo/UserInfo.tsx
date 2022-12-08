import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';

const UserInfo = () => {
	const {
		store,
		store: { user },
	} = useContext(Context);

	return (
		<div>
			<div>{user.email}</div>
			<div>{`Activated: ${user.isActivated}`}</div>
			<button onClick={() => store.logout()}>Logout</button>
		</div>
	);
};

export default observer(UserInfo);
