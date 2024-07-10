import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more"; // Import Highcharts More for additional modules
import HCBellcurve from "highcharts/modules/histogram-bellcurve"; // Import the bellcurve module

// Initialize the modules
HCMore(Highcharts);
HCBellcurve(Highcharts);

function CustomChart({ dataTransformed }) {
  useEffect(() => {
    if (dataTransformed.length === 0) return; // Don't render chart if no data

    Highcharts.chart("container", {
      chart: {
        type: "scatter",
      },
      title: {
        text: "Bell curve",
      },
      xAxis: [
        {
          title: {
            text: "Data",
          },
          alignTicks: false,
        },
        {
          title: {
            text: "Bell curve",
          },
          alignTicks: false,
          opposite: true,
        },
      ],
      yAxis: [
        {
          title: { text: "Data" },
        },
        {
          title: { text: "Bell curve" },
          opposite: true,
        },
      ],
      series: [
        {
          name: "Bell curve",
          type: "bellcurve",
          xAxis: 1,
          yAxis: 1,
          baseSeries: 1,
          zIndex: -1,
        },
        {
          name: "Data",
          type: "scatter",
          data: dataTransformed.map((emp) => parseFloat(emp.kpi)), // Use dataTransformed here
          accessibility: {
            exposeAsGroupOnly: true,
          },
          marker: {
            radius: 1.5,
          },
        },
      ],
    });
  }, [dataTransformed]); // Add dataTransformed to dependencies array to rerender on change

  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={{}} />
    </div>
  );
}

export default CustomChart;
