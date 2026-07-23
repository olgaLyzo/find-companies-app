import React, { useEffect, useState } from 'react';
import css from '../scss/components_styles/stat.module.scss';
import { getAccountInfo } from "../requests/statRequest";

const Statistic: React.FC = () => {
  const [quantity, setQuantity] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchStats = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				console.log("TOKEN BEFORE REQUEST", token);
				const data = await getAccountInfo();
				console.log(data);
				setQuantity(data.eventFiltersInfo.usedCompanyCount);
				setLimit(data.eventFiltersInfo.companyLimit);
			} catch (err) {
				console.log(err);
			}
		};
    fetchStats();
  }, []);

	if (error) {
		return (
			<div className={css.stat_block}>
				{error}
			</div>
		);
	}
  return (
    <div className={css.stat_block}>
      <div className={css.companies_block}>
        <p>Использовано компаний</p>
        <div className={css.num_of_companies}>
          {quantity ?? '-'}
        </div>
      </div>
      <div className={css.limit_block}>
        <p>Лимит по компаниям</p>
        <div className={css.limits}>
          {limit ?? '-'}
        </div>
      </div>
    </div>
  );
};


export default Statistic;