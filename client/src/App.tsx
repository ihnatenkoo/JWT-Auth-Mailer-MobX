import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import Form from './components/Form/Form';
import UserInfo from './components/UserInfo/UserInfo';
import { Context } from './main';

const App: FC = () => {
	const { store } = useContext(Context);

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
