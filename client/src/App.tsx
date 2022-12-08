import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect } from 'react';
import Form from './components/Form/Form';
import UserInfo from './components/UserInfo/UserInfo';
import { Context } from './main';

const App: FC = () => {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth();
		}
	}, []);

	if (store.isLoading) {
		return <p>Loading...</p>;
	}

	if (store.isAuth) {
		return (
			<>
				<UserInfo />
			</>
		);
	}

	return (
		<>
			<Form />
		</>
	);
};

export default observer(App);
