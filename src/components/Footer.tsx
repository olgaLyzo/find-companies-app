import css from '../scss/footer.module.scss';

const Footer: React.FC =()=>{
	return(
		<div className={css.footer}>
			<div className={css.logo}></div>
			<div className={css.info}>
				<a 
					className={css.adress}
					href="https://www.google.com/maps/search/?api=1&query=б-р+Цветной+40+Москва" 
					target="_blank" 
					rel="noopener noreferrer"> г. Москва, Цветной б-р, 40
				</a>
				<a className={css.phone_number} href="tel:+74957712111"> +7 (495) 771 21 11</a>
				<a className={css.mail} href="mailto:info@skan.ru">info@skan.ru</a>
				<div className={css.rights}> Copyright. 2022</div>
			</div>
		</div>
	)
}

export default Footer;