/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import { getEmployeeData } from "../data/employeeData";

function StatisticTable({
  kpiAverage,
  kpiSD,
  kpiPlus1SD,
  kpiMinus1SD,
  kpiPlus2SD,
  kpiMinus2SD,
}) {
  return (
    <Table
      css={css`
        text-align: center;
      `}
    >
      <tbody>
        <tr>
          <td>Average</td>
          <td>{kpiAverage.toFixed(2)}</td>
          <td>SD</td>
          <td>{kpiSD.toFixed(4)}</td>
        </tr>
        <tr>
          <td>+1 SD</td>
          <td>{kpiPlus1SD.toFixed(2)}</td>
          <td>-1 SD</td>
          <td>{kpiMinus1SD.toFixed(2)}</td>
        </tr>
        <tr>
          <td>+2 SD</td>
          <td>{kpiPlus2SD.toFixed(2)}</td>
          <td>-2 SD</td>
          <td>{kpiMinus2SD.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StatisticTable;
