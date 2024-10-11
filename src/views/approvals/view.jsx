import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TablePagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { getStatusColor } from 'utils/function';
import PageContainer from 'ui-component/MainPage';
import EmployeeDetail from './components/EmployeeDetail';
import ApprovalContents from './components/ApprovalContents';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
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
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const { state } = useLocation();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [additionalData, setAdditionalData] = useState({
    employeeData: null,
    remarks: []
  });

  const [statuses, setStatuses] = useState({
    plan_status: '',
    can_change_status: false
  });

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
      handlePlanStatus(values);
    }
  });

  const handlePlanStatus = async (values) => {
    setActionInfo((prevState) => ({ ...prevState, submitting: true }));
    const token = await GetToken();
    const Api = Backend.api + Backend.planStatus;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      fiscal_year_id: selectedYear?.id,
      status: actionInfo.action,
      remark: values.remark
    };

    fetch(Api, { method: 'POST', headers: header, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response?.data?.message);
          handleCloseModal();
          handleFetchingApprovalTasks();
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => {
        setActionInfo((prevState) => ({ ...prevState, submitting: false }));
      });
  };

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
          setAdditionalData({ ...additionalData, employeeData: response?.data?.employee, remarks: response?.data?.remarks?.data });
          setStatuses({ ...statuses, can_change_status: response?.data?.can_change_status, plan_status: response?.data?.plan_status });
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

  useEffect(() => {
    if (!state?.id) {
      navigate(-1);
    }
  }, [state?.id]);

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
    <PageContainer
      back={true}
      title="Approval Task Details"
      rightOption={
        statuses?.plan_status && (
          <Chip
            label={statuses?.plan_status}
            sx={{
              backgroundColor: theme.palette.grey[50],
              color: getStatusColor(statuses?.plan_status),
              textTransform: 'capitalize',
              fontWeight: 'bold'
            }}
          />
        )
      }
    >
      <Grid container padding={2.4} spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <EmployeeDetail loading={false} employee={additionalData.employeeData} />

          {!smallDevice && (
            <Box sx={{ paddingTop: 3 }}>
              <Conversations taskID={state?.id} status={statuses?.plan_status} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={9} xl={9}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
                </Grid>

                {statuses?.plan_status !== 'approved' && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={9}
                    xl={9}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                  >
                    <ApprovalActionButtons
                      onReview={() => handleOpenModal('Reviewed & sending back', 'reviewed')}
                      onApprove={() => handleOpenModal('Approving', 'approved')}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} my={2} sx={{ minHeight: '56dvh' }}>
              <ApprovalContents loading={loading} error={error} data={data} />
            </Grid>

            <Grid item xs={12} my={2}>
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

            {smallDevice && (
              <Grid item xs={12} sm={12}>
                <Box sx={{ paddingTop: 3 }}>
                  <Conversations taskID={state?.id} status={statuses?.plan_status} />
                </Box>
              </Grid>
            )}
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

      <ToastContainer />
    </PageContainer>
  );
};

export default ViewApprovalTask;
