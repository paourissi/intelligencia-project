import React, { useEffect } from "react";
import { chart } from "highcharts";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

const BarChart = ({ chartData }) => {
  useEffect(() => {
    chart("container", {
      chart: {
        type: "column",
        inverted: false,
      },
      title: {
        text: "Records per Words per Page",
      },
      xAxis: {
        title: {
          text: "Words",
        },
        categories: map("[0]", chartData),
      },
      yAxis: {
        title: {
          text: "Records",
        },
      },
      series: [
        {
          name: "Records",
          data: map("[1]", chartData),
        },
      ],
    });
  }, [chartData]);

  return <div id="container"></div>;
};

export default BarChart;

BarChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
};
