/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import Table from "react-bootstrap/Table";
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";

function StatisticTable({ employeeData }) {
  const { calculateStatistics, kpiStatistics } = useEmployeesKpiTools();

  useEffect(() => {
    if (employeeData && employeeData.length > 0) {
      calculateStatistics(employeeData);
    }
  }, [employeeData, calculateStatistics]);

  return (
    <Table
      css={css`
        text-align: center;
      `}
    >
      <tbody>
        <tr>
          <td>Average</td>
          <td>{kpiStatistics.kpiAverage.toFixed(2)}</td>
          <td>SD</td>
          <td>{kpiStatistics.kpiSD.toFixed(4)}</td>
        </tr>
        <tr>
          <td>+1 SD</td>
          <td>{kpiStatistics.kpiPlus1SD.toFixed(2)}</td>
          <td>-1 SD</td>
          <td>{kpiStatistics.kpiMinus1SD.toFixed(2)}</td>
        </tr>
        <tr>
          <td>+2 SD</td>
          <td>{kpiStatistics.kpiPlus2SD.toFixed(2)}</td>
          <td>-2 SD</td>
          <td>{kpiStatistics.kpiMinus2SD.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StatisticTable;
