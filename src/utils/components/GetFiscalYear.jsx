import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SET_FISCAL_YEARS, SET_SELECTED_FISCAL_YEAR } from 'store/actions';
import { useDispatch } from 'react-redux';
import Backend from 'services/backend';
import GetToken from '../auth-token';

const GetFiscalYear = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGettingFiscalYear = async () => {
      try {
        const Api = Backend.api + Backend.fiscalYear;
        const token = await GetToken();

        const response = await fetch(Api, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.success) {
          console.log(data.data);
          console.log(data.data[0]);
          dispatch({ type: SET_FISCAL_YEARS, fiscalYears: data.data });
          data.data[0] && dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: data.data[0] });
        } else {
          toast.error('Failed to fetch fiscal year data');
        }
      } catch (error) {
        toast.error('Error fetching fiscal year:', error);
      }
    };

    handleGettingFiscalYear();
  }, []);

  return null;
};

export default GetFiscalYear;
