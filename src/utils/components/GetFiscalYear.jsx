import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SET_FISCAL_YEARS, SET_SELECTED_FISCAL_YEAR } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Backend from 'services/backend';
import GetToken from '../auth-token';

const GetFiscalYear = () => {
  const selectedFiscal = useSelector((state) => state.customization.selectedFiscalYear);
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
          dispatch({ type: SET_FISCAL_YEARS, fiscalYears: data.data });
          if (selectedFiscal) {
            const selected = data?.data?.find((year) => year.id === selectedFiscal?.id);
            data.data[0] && dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: selected });
          } else {
            if (data.data[0]) {
              dispatch({ type: SET_SELECTED_FISCAL_YEAR, selectedFiscalYear: data.data[0] });
            }
          }
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
