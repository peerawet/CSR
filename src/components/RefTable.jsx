/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";
import { useEffect } from "react";

function RefTable({ employeeData }) {
  const { kpiStatistics, gradeCount, calculateGradeCounts } =
    useEmployeesKpiTools();

  useEffect(() => {
    if (employeeData || employeeData.length !== 0) {
      calculateGradeCounts(employeeData);
    }
  }, [employeeData, kpiStatistics]);

  return (
    <Table
      striped
      bordered
      hover
      css={css`
        text-align: center;
      `}
    >
      <thead>
        <tr>
          <th>Grade</th>
          <th>Score Range</th>
          <th>Number of Employees</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A+</td>
          <td>more than {kpiStatistics.kpiPlus2SD.toFixed(2)}</td>
          <td>{gradeCount.APlus}</td>
        </tr>
        <tr>
          <td>A</td>
          <td>
            {`${kpiStatistics.kpiPlus1SD.toFixed(
              2
            )} - ${kpiStatistics.kpiPlus2SD.toFixed(2)}`}
          </td>
          <td>{gradeCount.A}</td>
        </tr>
        <tr>
          <td>B</td>
          <td>
            {`${kpiStatistics.kpiAverage.toFixed(
              2
            )} - ${kpiStatistics.kpiPlus1SD.toFixed(2)}`}
          </td>
          <td>{gradeCount.B}</td>
        </tr>
        <tr>
          <td>C</td>
          <td>
            {`${kpiStatistics.kpiMinus1SD.toFixed(
              2
            )} - ${kpiStatistics.kpiAverage.toFixed(2)}`}
          </td>
          <td>{gradeCount.C}</td>
        </tr>
        <tr>
          <td>D</td>
          <td>
            {`${kpiStatistics.kpiMinus2SD.toFixed(
              2
            )} - ${kpiStatistics.kpiMinus1SD.toFixed(2)}`}
          </td>
          <td>{gradeCount.D}</td>
        </tr>
        <tr>
          <td>F</td>
          <td>less than {kpiStatistics.kpiMinus2SD.toFixed(2)}</td>
          <td>{gradeCount.F}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default RefTable;
