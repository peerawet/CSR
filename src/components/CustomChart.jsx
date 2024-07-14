import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more"; // Import Highcharts More for additional modules
import HCBellcurve from "highcharts/modules/histogram-bellcurve"; // Import the bellcurve module

// Initialize the modules
HCMore(Highcharts);
HCBellcurve(Highcharts);
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";

function CustomChart({ employeeData }) {
  const { weights } = useEmployeesKpiTools();
  useEffect(() => {
    const options = {
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
          data: employeeData.map(
            (employee) =>
              employee.departments.departmental_kpi *
                weights.departmental_kpi_weight +
              employee.individual_kpi * weights.individual_kpi_weight
          ),
          accessibility: {
            exposeAsGroupOnly: true,
          },
          marker: {
            radius: 1.5,
          },
        },
      ],
    };

    // Check if employeeData has data to render the chart
    if (employeeData.length > 0) {
      Highcharts.chart("container", options);
    } else {
      // If no data, render an empty chart
      Highcharts.chart("container", {
        ...options,
        series: [
          ...options.series,
          {
            name: "Data",
            type: "scatter",
            data: [],
          },
        ],
      });
    }
  }, [employeeData]);

  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={{}} />
    </div>
  );
}

export default CustomChart;
