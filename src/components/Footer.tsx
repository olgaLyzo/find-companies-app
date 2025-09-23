import css from '../scss/footer.module.scss';

const Footer: React.FC =()=>{
	return(
		<div className={css.footer}>
			<div className={css.logo}></div>
			<div className={css.info}>
				<div className={css.adress}>
					<a 
						href="https://www.google.com/maps/search/?api=1&query=б-р+Цветной+40+Москва" 
						target="_blank" 
						rel="noopener noreferrer">
  					г. Москва, Цветной б-р, 40
					</a>
				</div>
				<div className={css.phone_number}>
					<a href="tel:+74957712111"> +7 (495) 771 21 11</a>
				</div>
				<div className={css.mail}> 
					<a href="mailto:info@skan.ru">info@skan.ru</a>
				</div>
				<div className={css.rights}> Copyright. 2022</div>
			</div>
		</div>
	)
}

export default Footer;