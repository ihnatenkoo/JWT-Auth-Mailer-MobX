import { FC, PropsWithChildren } from 'react';
import s from './FormBtn.module.scss';

interface IBtn extends PropsWithChildren {
	className?: string;
	handler?: (() => void) | undefined;
}

const MainBtn: FC<IBtn> = ({ children, handler }) => {
	return (
		<button onClick={handler} className={s.btn}>
			{children}
		</button>
	);
};

export default MainBtn;
