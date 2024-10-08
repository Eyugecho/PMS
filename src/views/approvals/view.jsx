import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TablePagination } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import PageContainer from 'ui-component/MainPage';
import EmployeeDetail from './components/EmployeeDetail';
import ApprovalContents from './components/ApprovalContents';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import IsEmployee from 'utils/is-employee';
import Search from 'ui-component/search';
import ApprovalActionButtons from './components/ApprovalActionButtons';
import * as Yup from 'yup';
import DrogaFormModal from 'ui-component/modal/DrogaFormModal';
import Conversations from './components/Conversations';

const validationSchema = Yup.object().shape({
  remark: Yup.string()
});

const ViewApprovalTask = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEmployee = IsEmployee();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

  const [actionInfo, setActionInfo] = useState({
    openModal: false,
    title: 'Change Status',
    action: '',
    submitting: false
  });

  const formik = useFormik({
    initialValues: {
      remark: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleButtonActions(values);
    }
  });

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };

  const handleFetchingApprovalTasks = async () => {
    setLoading(true);
    const token = await GetToken();
    const Api =
      Backend.api +
      Backend.getApprovalTasksDetail +
      state?.id +
      `?fiscal_year_id=${selectedYear?.id}&page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;

    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response?.data?.plans?.data);
          setPagination({ ...pagination, total: response.data?.plans?.total });
          setError(false);
        } else {
          toast.warning(response.data.message);
          setError(false);
        }
      })
      .catch((error) => {
        toast.warning(error.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenModal = (title, action) => {
    setActionInfo({ ...actionInfo, openModal: true, title: title, action: action });
  };

  const handleCloseModal = () => {
    setActionInfo({ ...actionInfo, openModal: false, acttion: '' });
    formik.setFieldValue('remark', '');
  };

  const handleButtonActions = async (values) => {
    const token = await GetToken();
    const Api = Backend.api + Backend.getMyPlans;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      status: actionInfo.action,
      remark: values.remark
    };

    fetch(Api, { method: 'POST', headers: header, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  // useEffect(() => {
  //   if (!state?.id) {
  //     navigate(-1);
  //   }
  // }, [state?.id]);

  useEffect(() => {
    if (mounted) {
      handleFetchingApprovalTasks();
    } else {
      setMounted(true);
    }
  }, [pagination.page, pagination.per_page]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingApprovalTasks();
    }, 600);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  return (
    <PageContainer back={true} title="Approval Task Details">
      <Grid container padding={2.4} spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <EmployeeDetail loading={loading} employee={[]} />

          {/* <Box sx={{ paddingTop: 3 }}>
            <Conversations loading={loading} conversation={[]} />
          </Box> */}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={9} xl={9}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                  <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
                </Grid>

                <Grid item xs={12} sm={12} md={8} lg={9} xl={9} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <ApprovalActionButtons
                    onReject={() => handleOpenModal('Rejecting Plan', 'reject')}
                    onApprove={() => handleOpenModal('Approving Plan', 'approve')}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} my={2}>
              <ApprovalContents loading={loading} data={data} />

              {!loading && pagination.total > pagination.per_page && (
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  count={pagination.total}
                  rowsPerPage={pagination.per_page}
                  page={pagination.page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Items per page"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DrogaFormModal
        open={actionInfo.openModal}
        title={actionInfo.title}
        handleClose={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={formik.handleSubmit}
        submitting={actionInfo.submitting}
      >
        <FormControl fullWidth error={formik.touched.remark && Boolean(formik.errors.remark)}>
          <InputLabel htmlFor="remark">Remark (Optional)</InputLabel>
          <OutlinedInput
            id="remark"
            name="remark"
            label="Remark (Optional)"
            value={formik.values.remark}
            onChange={formik.handleChange}
            multiline
            rows={4}
            fullWidth
          />
          {formik.touched.remark && formik.errors.remark && (
            <FormHelperText error id="standard-weight-helper-text-remark">
              {formik.errors.remark}
            </FormHelperText>
          )}
        </FormControl>
      </DrogaFormModal>
    </PageContainer>
  );
};

export default ViewApprovalTask;
