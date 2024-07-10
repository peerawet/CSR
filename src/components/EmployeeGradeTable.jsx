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

function EmployeeGradeTable({
  displayEmployeeData,
  kpiAverage,
  kpiSD,
  kpiPlus1SD,
  kpiMinus1SD,
  kpiPlus2SD,
  kpiMinus2SD,
}) {
  const [gradeCounts, setGradeCounts] = useState({
    APlus: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  });

  useEffect(() => {
    const counts = {
      APlus: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    };

    displayEmployeeData.forEach((employee) => {
      const weightedScore =
        employee.departmental_kpi * 0.3 + employee.individual_kpi * 0.7;
      const grade = calculateGrade(weightedScore);
      counts[grade]++;
    });

    setGradeCounts(counts);
  }, [displayEmployeeData]);

  function calculateGrade(kpi) {
    if (kpi >= kpiPlus2SD) {
      return "APlus";
    } else if (kpi >= kpiPlus1SD && kpi < kpiPlus2SD) {
      return "A";
    } else if (kpi >= kpiAverage && kpi < kpiPlus1SD) {
      return "B";
    } else if (kpi >= kpiMinus1SD && kpi < kpiAverage) {
      return "C";
    } else if (kpi >= kpiMinus2SD && kpi < kpiMinus1SD) {
      return "D";
    } else {
      return "F";
    }
  }

  const gradeData = {
    labels: Object.keys(gradeCounts),
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
        data: Object.values(gradeCounts),
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
            width: 50%;
          `}
        >
          <Bar data={gradeData} />
        </div>
      </div>
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
          {displayEmployeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.rank}</td>
              <td>{employee.department}</td>
              <td>{employee.departmental_kpi}</td>
              <td>{employee.individual_kpi}</td>
              <td>
                {(
                  employee.departmental_kpi * 0.3 +
                  employee.individual_kpi * 0.7
                ).toFixed(2)}
              </td>
              <td>
                {calculateGrade(
                  employee.departmental_kpi * 0.3 +
                    employee.individual_kpi * 0.7
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default EmployeeGradeTable;
