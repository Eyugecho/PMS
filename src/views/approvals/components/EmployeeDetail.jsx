import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { DetailInfo } from 'views/employees/components/DetailInfo';
import { IconCalendar, IconChartDonut, IconGenderMale, IconMail, IconPhone, IconTie, IconUser } from '@tabler/icons-react';
import { format } from 'date-fns';
import DrogaCard from 'ui-component/cards/DrogaCard';
import PropTypes from 'prop-types';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

const EmployeeDetail = ({ loading, employee }) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <DrogaCard sx={{ minHeight: 400 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 0.4,
            borderColor: theme.palette.divider,
            paddingBottom: 1.8
          }}
        >
          <Typography variant="h4">Employee Details</Typography>
        </Box>
        {loading ? (
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
              <ActivityIndicator size={20} />
            </Grid>
          </Grid>
        ) : (
          <Box>
            {employee?.user && <DetailInfo label={'Full name'} info={employee?.user?.name} icon={<IconUser size={22} />} />}
            {employee?.gender && <DetailInfo label={'Gender'} info={employee?.gender} icon={<IconGenderMale size={22} />} />}
            {employee?.user?.email && <DetailInfo label={'Email'} info={employee?.user?.email} icon={<IconMail size={22} />} />}
            {employee?.user?.phone && <DetailInfo label={'Phone'} info={employee?.user?.phone} icon={<IconPhone size={22} />} />}

            {employee?.user?.role && <DetailInfo label={'Role'} info={employee?.user?.role} icon={<IconTie size={22} />} />}
            {employee?.position && <DetailInfo label={'Position'} info={employee?.position} icon={<IconChartDonut size={22} />} />}

            {employee?.user?.created_at && (
              <DetailInfo label={'Start date'} info={format(employee?.user?.created_at)} icon={<IconCalendar size={22} />} />
            )}
          </Box>
        )}
      </DrogaCard>
    </React.Fragment>
  );
};

EmployeeDetail.propTypes = {
  employee: PropTypes.oneOf([PropTypes.array, PropTypes.object])
};

export default EmployeeDetail;
