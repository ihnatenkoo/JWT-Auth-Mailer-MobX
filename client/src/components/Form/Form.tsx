import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { Context } from '../../main';
import FormBtn from '../FormBtn/FormBtn';
import s from './Form.module.scss';

const LoginForm: FC = () => {
	const [inputData, setInputData] = useState({
		email: '',
		password: '',
	});

	const { store } = useContext(Context);

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputData({ ...inputData, [e.target.name]: e.target.value });
	};

	const onLoginHandler = (): void => {
		store.login(inputData.email, inputData.password);
		setInputData({ email: '', password: '' });
	};

	const onRegisterHandler = (): void => {
		store.registration(inputData.email, inputData.password);
		setInputData({ email: '', password: '' });
	};

	const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	return (
		<form className={s.form} onSubmit={onFormSubmit}>
			<input
				type="text"
				placeholder="Enter email"
				value={inputData.email}
				name="email"
				onChange={onChangeValue}
			/>
			<input
				type="text"
				placeholder="Enter password"
				value={inputData.password}
				name="password"
				onChange={onChangeValue}
			/>

			<div className={s.form__footer}>
				<FormBtn handler={onRegisterHandler}>Register</FormBtn>
				<FormBtn handler={onLoginHandler}>Log in</FormBtn>
			</div>
		</form>
	);
};

export default observer(LoginForm);
