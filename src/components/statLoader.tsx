import css from '../scss/components_styles/loader.module.scss';

interface LoaderProps {
	showText?: boolean;
	small?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
	showText = true,
	small = false,
}) => (
	<>
		<div className={`${css.loader} ${small ? css.small : ''}`}>
			{Array.from({ length: 8 }).map((_, index) => (
				<span
					key={index}
					style={{ "--i": index } as React.CSSProperties}
				/>
			))}
		</div>

		{showText && (
			<p className={css.text}>
				Загружаем данные
			</p>
		)}
	</>
);

export default Loader;