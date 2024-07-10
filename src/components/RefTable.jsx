/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import { getEmployeeData } from "../data/employeeData";

function RefTable({
  kpiAverage,
  kpiSD,
  kpiPlus1SD,
  kpiMinus1SD,
  kpiPlus2SD,
  kpiMinus2SD,
  dataTransformed,
}) {
  const calculateGradeCounts = () => {
    let gradeCounts = {
      APlus: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    };

    dataTransformed.forEach((employee) => {
      const kpi = parseFloat(employee.kpi);
      if (kpi >= kpiPlus2SD) {
        gradeCounts.APlus += 1;
      } else if (kpi >= kpiPlus1SD && kpi < kpiPlus2SD) {
        gradeCounts.A += 1;
      } else if (kpi >= kpiAverage && kpi < kpiPlus1SD) {
        gradeCounts.B += 1;
      } else if (kpi >= kpiMinus1SD && kpi < kpiAverage) {
        gradeCounts.C += 1;
      } else if (kpi >= kpiMinus2SD && kpi < kpiMinus1SD) {
        gradeCounts.D += 1;
      } else {
        gradeCounts.F += 1;
      }
    });

    return gradeCounts;
  };

  const gradeCounts = calculateGradeCounts();
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
          <th>ระดับคะแนน</th>
          <th>จำนวนคน</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A+</td>
          <td>more than {kpiPlus2SD.toFixed(2)}</td>
          <td>{gradeCounts.APlus}</td>
        </tr>
        <tr>
          <td>A</td>
          <td>{`${kpiPlus1SD.toFixed(2)} - ${kpiPlus2SD.toFixed(2)}`}</td>
          <td>{gradeCounts.A}</td>
        </tr>
        <tr>
          <td>B</td>
          <td>{`${kpiAverage.toFixed(2)} - ${kpiPlus1SD.toFixed(2)}`}</td>
          <td>{gradeCounts.B}</td>
        </tr>
        <tr>
          <td>C</td>
          <td>{`${kpiMinus1SD.toFixed(2)} - ${kpiAverage.toFixed(2)}`}</td>
          <td>{gradeCounts.C}</td>
        </tr>
        <tr>
          <td>D</td>
          <td>{`${kpiMinus2SD.toFixed(2)} - ${kpiMinus1SD.toFixed(2)}`}</td>
          <td>{gradeCounts.D}</td>
        </tr>
        <tr>
          <td>F</td>
          <td>less than {kpiMinus2SD.toFixed(2)}</td>
          <td>{gradeCounts.F}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default RefTable;
