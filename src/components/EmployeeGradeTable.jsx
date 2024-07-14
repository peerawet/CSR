/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
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
  BarElement,
} from "chart.js";
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  BarElement
);

function EmployeeGradeTable({ employeeData }) {
  const { kpiStatistics, gradeCount, weights } = useEmployeesKpiTools();

  const calculateGrade = (kpi) => {
    if (kpi >= kpiStatistics.kpiPlus2SD) {
      return "A+";
    } else if (kpi >= kpiStatistics.kpiPlus1SD) {
      return "A";
    } else if (kpi >= kpiStatistics.kpiAverage) {
      return "B";
    } else if (kpi >= kpiStatistics.kpiMinus1SD) {
      return "C";
    } else if (kpi >= kpiStatistics.kpiMinus2SD) {
      return "D";
    } else {
      return "F";
    }
  };

  const gradeData = {
    labels: Object.keys(gradeCount),
    datasets: [
      {
        label: "Employee Grades",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderWidth: 1,
        data: Object.values(gradeCount),
      },
    ],
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 100%;
            @media (min-width: 992px) {
              /* Large screen styles */
              width: 50%;
            }
          `}
        >
          <Bar data={gradeData} />
        </div>
      </div>
      <div
        css={css`
          overflow-x: auto; /* Enable horizontal scrollbar */
          margin-top: 20px;
        `}
      >
        <Table
          striped
          bordered
          hover
          css={css`
            text-align: center;
            margin-top: 20px;
          `}
        >
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ตำแหน่ง</th>
              <th>หน่วยงาน</th>
              <th>คะแนน Departmental KPI</th>
              <th>คะแนน Individual KPI</th>
              <th>คะแนนรวมตามน้ำหนัก</th>
              <th>Grade ตาม Bell Curve</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.rank}</td>
                <td>{employee.department}</td>
                <td>{employee.departments.departmental_kpi}</td>
                <td>{employee.individual_kpi}</td>
                <td>
                  {(
                    employee.departments.departmental_kpi *
                      weights.departmental_kpi_weight +
                    employee.individual_kpi * weights.individual_kpi_weight
                  ).toFixed(2)}
                </td>
                <td>
                  {calculateGrade(
                    employee.departments.departmental_kpi *
                      weights.departmental_kpi_weight +
                      employee.individual_kpi * weights.individual_kpi_weight
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default EmployeeGradeTable;
