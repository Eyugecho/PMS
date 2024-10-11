import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, CircularProgress, Grid, Pagination, TablePagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import Search from 'ui-component/search';
import ListView from './components/ListView';
import axios from 'axios';
import DrogaCard from 'ui-component/cards/DrogaCard';
import CardView from './components/CardView';
import AddKPI from './components/AddKPI';
import UpdateKPI from './components/UpdateKPI';
import DeletePrompt from 'ui-component/modal/DeletePrompt';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import SplitButton from 'ui-component/buttons/SplitButton';
import noresult from '../../assets/images/no_result.png';
import GetToken from 'utils/auth-token';
import UploadFile from 'ui-component/modal/UploadFile';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import hasPermission from 'utils/auth/hasPermission';
import Fallbacks from 'utils/components/Fallbacks';

const KPIManagement = () => {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('card');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [perspectivesSelector] = useState([{ label: 'All Perspectives', value: '' }]);
  const [measuringUnit] = useState([{ label: 'All Measuring', value: '' }]);
  const [variationCategory] = useState([{ label: 'All Variation', value: '' }]);
  const [filter, setFilter] = useState({
    perspective: '',
    m_unit: '',
    variation: ''
  });
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    last_page: 0,
    total: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [perspectiveTypes, setPerspectiveTypes] = useState([]);
  const [variationCategories, setVariationCategories] = useState([]);
  const [add, setAdd] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedKPI, setSelectedKPI] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [importExcel, setImportExcel] = useState(false);

  const [deleteKPI, setDeleteKPI] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summary, setSummary] = useState(null);

  const AddKpiOptions = ['Add Kpi', 'Import From Excel'];

  const handleOpen = () => {
    setAdd(true);
    measuringUnits.length === 0 && handleFetchingPresetups();
  };

  const handleClose = () => {
    setAdd(false);
  };

  const handleOpenUpdate = (data) => {
    setSelectedKPI(data);
    setUpdate(true);

    measuringUnits.length === 0 && handleFetchingPresetups();
  };

  const handleDeleteKPI = (data) => {
    setSelectedKPI(data);
    setDeleteKPI(true);
  };

  const handleCloseUpdate = () => {
    setUpdate(false);
    setSelectedKPI(null);
  };
  const handleOpenDialog = () => {
    setImportExcel(true);
  };

  const handleCloseDialog = () => {
    setImportExcel(false);
  };

  const handleFetchingPresetups = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.preSetups;
      const response = await axios.get(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setPerspectiveTypes(response.data.data.perspective_types);
        setMeasuringUnits(response.data.data.measuring_units);
        setVariationCategories(response.data.data.variation_categories);

        handleSettingUpPerspectiveFilter(response.data.data.perspective_types);
        handleSettingUpMeasuringUnitFilter(response.data.data.measuring_units);
        handleSettingUpVariationFilter(response.data.data.variation_categories);

        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleKPICreation = async (values) => {
    setAdding(true);
    try {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.kpi;

      // Ensure that variation_category is a valid category
      if (!variationCategories.includes(values.variation_category)) {
        throw new Error('Invalid variation category selected');
        setAdding(false);
      }

      const response = await axios(Api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        data: JSON.stringify(values)
      });

      if (!response.data.success) {
        toast.error(response.data.message || 'Error occurred');
        setAdding(false);
      } else {
        handleFetchingKpi();
        handleClose();
        toast.success(response.data.data.message);
        setAdding(false);
      }
    } catch (error) {
      toast.error(error.message);
      setAdding(false);
    }
  };

  const handleKPIUpdate = async (values) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.kpi + `/${selectedKPI?.id}`;

      // Ensure that variation_category is a valid category
      if (!variationCategories.includes(values.variation_category)) {
        setIsUpdating(false);
        throw new Error('Invalid variation category selected');
      }

      const response = await axios(Api, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: JSON.stringify(values)
      });

      if (!response.data.success) {
        toast.error(response.data.message || 'Error occurred');
        setIsUpdating(false);
      } else {
        handleFetchingKpi();
        handleCloseUpdate();
        toast.success(response.data.data.message);
        setIsUpdating(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.kpi + `/${selectedKPI?.id}`;
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDeleting(false);
        setDeleteKPI(false);
        setData((prevKpis) => prevKpis.filter((kpi) => kpi.id !== selectedKPI?.id));
        toast.success(response.data.data.message);
      } else {
        setDeleting(false);
        toast.error(response.data.data.message);
      }
    } catch (error) {
      setDeleting(false);
      toast.error(error.message);
    }
  };

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };

  const handleFiltering = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSettingUpPerspectiveFilter = (perspective) => {
    perspectivesSelector.length < 2 &&
      perspective.forEach((perspective) => perspectivesSelector.push({ label: perspective.name, value: perspective.id }));
  };

  const handleSettingUpMeasuringUnitFilter = (measuring_unit) => {
    measuringUnit.length < 2 && measuring_unit.forEach((m_unit) => measuringUnit.push({ label: m_unit.name, value: m_unit.id }));
  };

  const handleSettingUpVariationFilter = (variations) => {
    variationCategory.length < 2 && variations.forEach((variation) => variationCategory.push({ label: variation, value: variation }));
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };

  const handleFetchingKpi = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const Api =
        Backend.api +
        Backend.kpi +
        `?page=${pagination.page + 1}&per_page=${pagination.per_page}&search=${search}&perspective_type_id=${filter.perspective}&measuring_unit_id=${filter.m_unit}&variation_category=${filter.variation}`;
      const response = await axios.get(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setData(response.data.data.data);
        setPagination({ ...pagination, total: response.data.data.total, last_page: response.data.data.last_page });
        setError(false);
      } else {
        setError(false);
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchingSummary = async () => {
    setIsLoadingSummary(true);
    try {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.getStats;
      const response = await axios.get(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSummary(response.data.data);
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleUpload = async (file) => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.kpiExcell;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(Api, formData, {
        headers: headers,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (response.success) {
        toast.success(response.data.data.message);
      } else {
        toast.success(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleKpiAdd = (index) => {
    if (index === 0) {
      handleOpen();
    } else if (index === 1) {
      handleOpenDialog();
    } else {
      alert('We will be implement importing from odoo');
    }
  };

  useEffect(() => {
    if (mounted) {
      handleFetchingKpi();
    } else {
      setMounted(true);
    }
  }, [pagination.page, pagination.per_page, filter]);

  useEffect(() => {
    handleFetchingPresetups();
  }, []);

  useEffect(() => {
    handleFetchingSummary();
    return () => {};
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingKpi();
    }, 800);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  return (
    <PageContainer
      title="KPI Management"
      rightOption={hasPermission('create:kpi') && <SplitButton options={AddKpiOptions} handleSelection={(value) => handleKpiAdd(value)} />}
    >
      <Grid container padding={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} md={11} lg={8} xl={8}>
              <DrogaCard sx={{ py: 1.2 }}>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  spacing={gridSpacing}
                >
                  <Grid item xs={12} sm={12} md={4} lg={3.6} xl={3.6}>
                    <Search title="Filter KPI" value={search} onChange={(event) => handleSearchFieldChange(event)} filter={false}></Search>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: smallDevice ? 'flex-start' : 'flex-end'
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <SelectorMenu
                          name="perspective"
                          options={perspectivesSelector}
                          selected={filter.perspective}
                          handleSelection={handleFiltering}
                        />
                        <Box sx={{ marginLeft: 2 }}>
                          <SelectorMenu name="m_unit" options={measuringUnit} selected={filter.m_unit} handleSelection={handleFiltering} />
                        </Box>

                        <Box sx={{ marginLeft: 2 }}>
                          <SelectorMenu
                            name="variation"
                            options={variationCategory}
                            selected={filter.variation}
                            handleSelection={handleFiltering}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <ButtonBase
                      onClick={() => setView('card')}
                      sx={{
                        marginLeft: 2,
                        padding: 0.6,
                        borderRadius: 2,
                        ':hover': { backgroundColor: theme.palette.grey[100] },
                        transition: 'all 0.4s ease',
                        backgroundColor: view === 'card' && theme.palette.grey[100]
                      }}
                    >
                      <IconLayoutGrid stroke={1.6} size="1.4rem" style={{ color: view === 'card' && theme.palette.primary[800] }} />
                    </ButtonBase>
                    <ButtonBase
                      onClick={() => setView('list')}
                      sx={{
                        padding: 0.6,
                        marginLeft: 2,
                        borderRadius: 2,
                        ':hover': { backgroundColor: theme.palette.grey[100] },
                        transition: 'all 0.4s ease',
                        backgroundColor: view === 'list' && theme.palette.grey[100]
                      }}
                    >
                      <IconLayoutList stroke={1.6} size="1.4rem" style={{ color: view === 'list' && theme.palette.primary[800] }} />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DrogaCard>
              {loading ? (
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8
                  }}
                >
                  <CircularProgress size={22} />
                </Grid>
              ) : error ? (
                <ErrorPrompt image={noresult} title="Server Error" message="Unable to retrive the KPI's!" />
              ) : data.length === 0 ? (
                <Fallbacks
                  severity="kpis"
                  title="KPI is not found"
                  description="The list of KPI will be listed here"
                  sx={{ paddingTop: 6 }}
                />
              ) : view === 'list' ? (
                <ListView data={data} onEdit={(kpi) => handleOpenUpdate(kpi)} onDelete={(kpi) => handleDeleteKPI(kpi)} />
              ) : (
                <Grid container sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 0.6 }} spacing={2}>
                  <CardView data={data} onEdit={(kpi) => handleOpenUpdate(kpi)} onDelete={(kpi) => handleDeleteKPI(kpi)} />
                </Grid>
              )}

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

            <Grid item xs={12} sm={12} md={11} lg={4} xl={4}>
              <DrogaCard>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1.4,
                    borderBottom: 0.8,
                    borderColor: theme.palette.divider
                  }}
                >
                  <Typography variant="h3" color={theme.palette.text.primary} sx={{ marginLeft: 1 }}>
                    KPI Summary
                  </Typography>
                </Box>

                {isLoadingSummary ? (
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 8
                    }}
                  >
                    <CircularProgress size={18} />
                  </Grid>
                ) : error ? (
                  <ErrorPrompt image={noresult} title="Server Error" message="error retriving summarries" />
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, my: 1 }}>
                      <Typography variant="subtitle1" color={theme.palette.text.primary}>
                        Total KPI's
                      </Typography>
                      <Typography variant="h4" color={theme.palette.text.primary}>
                        {summary?.kpis}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, my: 1 }}>
                      <Typography variant="subtitle1" color={theme.palette.text.primary}>
                        Total Perspective Types
                      </Typography>
                      <Typography variant="h4" color={theme.palette.text.primary}>
                        {summary?.perspectiveTypes}
                      </Typography>
                    </Box>
                  </>
                )}
              </DrogaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddKPI
        open={add}
        handleClose={handleClose}
        isLoading={isLoading}
        measuringUnits={measuringUnits}
        perspectiveTypes={perspectiveTypes}
        variationCategories={variationCategories}
        handleSubmission={(values) => handleKPICreation(values)}
        isAdding={isAdding}
      />

      {selectedKPI && (
        <UpdateKPI
          open={update}
          selectedKPI={selectedKPI}
          handleClose={handleCloseUpdate}
          isLoading={isLoading}
          measuringUnits={measuringUnits}
          perspectiveTypes={perspectiveTypes}
          variationCategories={variationCategories}
          handleSubmission={(values) => handleKPIUpdate(values)}
          isUpdating={isUpdating}
        />
      )}

      {deleteKPI && (
        <DeletePrompt
          type="Delete"
          open={deleteKPI}
          title="Deleting KPI"
          description={`Are you sure you want to delete ` + selectedKPI?.name}
          onNo={() => setDeleteKPI(false)}
          onYes={() => handleDelete()}
          deleting={deleting}
          handleClose={() => setDeleteKPI(false)}
        />
      )}

      <UploadFile
        open={importExcel}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        uploadProgress={uploadProgress}
        onRemove={() => setUploadProgress(0)}
      />
      <ToastContainer />
    </PageContainer>
  );
};

export default KPIManagement;
