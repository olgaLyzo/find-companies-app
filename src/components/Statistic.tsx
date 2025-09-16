
import React from 'react';
import { useState } from 'react';
import css from '../scss/stat.module.scss';

export interface StatProps {
	statData:{
		quantity: number; 
		limit: number; 
	}[]
		
}

const Statistic: React.FC<StatProps> = () => {
	const [ quantity, setQuantity ] = useState(34);
	const [ limit, setLimit ] = useState(100);
	
	return (
		<div className = {css.stat_block}>
			<p>Использовано компаний </p>
			<div className = {css.num_of_companies}>{quantity}</div>
			<p>Лимит по компаниям</p>
			<div className = {css.limits}>{limit}</div>
		</div>
	)
}

export default Statistic;