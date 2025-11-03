import React, { useState, useEffect } from 'react';
import css from '../scss/stat.module.scss';
import { getAccountInfo } from "../requests/statRequest";

const Statistic: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAccountInfo();
      setQuantity(data.eventFiltersInfo.usedCompanyCount);
      setLimit(data.eventFiltersInfo.companyLimit);
      
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className={css.stat_block}>Загрузка...</div>;
  }

  if (error) {
    return <div className={css.stat_block}>{error}</div>;
  }

  return (
    <div className={css.stat_block}>
      <div className={css.companies_block}>
        <p>Использовано компаний</p>
        <div className={css.num_of_companies}>{quantity}</div>
      </div>

      <div className={css.limit_block}>
        <p>Лимит по компаниям</p>
        <div className={css.limits}>{limit}</div>
      </div>
    </div>
  );
};

export default Statistic;