/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import { getEmployeeData } from "../data/employeeData";
import StatisticTable from "./StatisticTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

function CustomChart() {
  const [ratingsData, setRatingsData] = useState([0, 10, 25, 59, 20, 10]);

  const options = {
    responsive: true, // Ensures the chart is responsive to container size changes

    plugins: {
      tooltip: { enabled: false }, // Disables tooltips
      hover: { mode: null }, // Disables hover interactions
      legend: {
        position: "top", // Positions the legend at the top of the chart
      },
      title: {
        display: true,
        text: "", // Title text (you can customize this)
      },
      annotation: {
        clip: false,
        annotations: {
          // Annotations for specific points on the chart
          label1: {
            type: "label",
            display: true,
            xValue: 1, // X-axis value for annotation
            yValue: ratingsData[1] + 20, // Y-axis value for annotation (adjust as per your data)
            backgroundColor: "rgba(255,255,255)", // Background color of annotation
            content: [ratingsData[1] ? `${ratingsData[1]}%` : ""], // Content of annotation (adjust based on your data)
            font: {
              size: 9, // Font size of annotation
            },
          },
          // Repeat similar annotations for label2, label3, etc.
        },
      },
      datalabels: {
        display: true, // Hides data labels (you can set this to true to display labels on data points)
      },
    },

    tension: 0.4, // Tension of the bezier curve in line charts

    scales: {
      x: {
        grid: {
          display: false, // Disables x-axis grid lines
        },
        title: {
          padding: { top: 35, left: 0, right: 0, bottom: 0 },
          display: true,
          text: "Normal Company Wide Ratings", // X-axis title
          font: {
            weight: "bold",
            size: 12,
          },
        },
        ticks: {
          font: {
            weight: "bold",
            size: 9,
          },
        },
      },
      y: {
        grid: {
          display: true, // Disables y-axis grid lines
        },
        title: {
          display: true,
          text: "Number of Newers", // Y-axis title
          font: {
            weight: "bold",
            size: 12,
          },
        },
        ticks: {
          display: true, // Hides y-axis ticks
        },
      },
    },
  };

  const labels = [
    "",

    [[1], ["Needs"], [" Improvement"]],

    "",

    [[2], ["Below"], [" Expectations"]],

    "",

    [[3], ["Met"], [" Expectations"]],

    "",

    [[4], ["Exceeded"], [" Expectations"]],

    "",

    [[5], ["Outstanding"]],

    "",
  ];

  const getAverageValue = (arr, index) => {
    let w = 0,
      x,
      y,
      z = 0;

    x = arr[index];

    y = arr[index + 1];

    return x > y ? y + (x - y) / 2 : x + (y - x) / 2;
  };

  const labels1 = {
    0: getAverageValue(ratingsData, 0),

    0.5: ratingsData[1],

    1: getAverageValue(ratingsData, 1),

    1.5: ratingsData[2],

    2: getAverageValue(ratingsData, 2),

    2.5: ratingsData[3],

    3: getAverageValue(ratingsData, 3),

    3.5: ratingsData[4],

    4: getAverageValue(ratingsData, 4),

    4.5: ratingsData[5],

    5: 0,
  };

  var colors = [
    "rgba(241,91,105,1)",

    "rgba(254,226,130,1)",

    "rgba(31,158,107,1)",

    "rgba(79,162,255,1)",

    "rgba(64,56,255,1)",
  ];

  let DataSet = [
    {
      label: ``,

      data: [labels1["0"], labels1["0.5"], labels1["1"]],

      fill: {
        target: "origin",

        above: colors[0],
      },

      backgroundColor: "rgb(255,255,255,0)",

      borderColor: "rgb(255,255,255,0)",
    },

    {
      label: ``,

      data: [
        labels1["0"],

        labels1["0.5"],

        labels1["1"],

        labels1["1.5"],

        labels1["2"],
      ],

      fill: {
        target: "origin",

        above: colors[1],
      },

      backgroundColor: "rgb(255,255,255,0)",

      borderColor: "rgb(255,255,255,0)",
    },

    {
      label: ``,

      data: [
        labels1["0"],

        labels1["0.5"],

        labels1["1"],

        labels1["1.5"],

        labels1["2"],

        labels1["2.5"],

        labels1["3"],
      ],

      fill: {
        target: "origin",

        above: colors[2],
      },

      backgroundColor: "rgb(255,255,255,0)",

      borderColor: "rgb(255,255,255,0)",
    },

    {
      label: ``,

      data: [
        labels1["0"],

        labels1["0.5"],

        labels1["1"],

        labels1["1.5"],

        labels1["2"],

        labels1["2.5"],

        labels1["3"],

        labels1["3.5"],

        labels1["4"],
      ],

      fill: {
        target: "origin",

        above: colors[3],
      },

      backgroundColor: "rgb(255,255,255,0)",

      borderColor: "rgb(255,255,255,0)",
    },

    {
      label: ``,

      data: [
        labels1["0"],

        labels1["0.5"],

        labels1["1"],

        labels1["1.5"],

        labels1["2"],

        labels1["2.5"],

        labels1["3"],

        labels1["3.5"],

        labels1["4"],

        labels1["4.5"],

        labels1["5"],
      ],

      fill: {
        target: "origin",

        above: colors[4],
      },

      backgroundColor: "rgb(255,255,255,0)",

      borderColor: "rgb(255,255,255,0)",
    },
  ];

  const data = {
    labels: labels,

    datasets: DataSet,
  };

  return (
    <>
      <div>
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default CustomChart;
