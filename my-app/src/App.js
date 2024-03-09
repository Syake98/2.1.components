import './App.css';
import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length > 3 ? true : false;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			return;
		}
		setError('');
		setValue(promptValue);
	};

	const onAddButtonClick = () => {
		if (value.length < 3) return;
		setList((prev) => [...prev, { id: Date.now(), value, date: new Date() }]);
		setValue('');
		setError('');
	};

	return (
		<div className={styles['app']}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles['error']}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles['button']} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles['button']}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? (
					<ul className={styles['list']}>
						{list.map((el) => (
							<li className={styles['list-item']} key={el.id}>
								{el.value}
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
