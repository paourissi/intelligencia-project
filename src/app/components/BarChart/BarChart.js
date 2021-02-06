// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { chart } from 'highcharts';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash/fp';

const BarChart = ({ data }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isEmpty(data) ? '' : setChartData(data);
  }, [data]);

  useEffect(() => {
    chart('container', {
      chart: {
        type: 'column',
        inverted: false
      },
      title: {
        text: 'Records per Words per Page'
      },
      xAxis: {
        title: {
          text: 'Words'
        },
        categories: map('[0]', chartData)
      },
      yAxis: {
        title: {
          text: 'Records'
        }
      },
      series: [
        {
          name: 'Records',
          data: map('[1]', chartData)
        }
      ]
    });
  }, [chartData]);

  return <div id="container"></div>;
};

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  )
};
