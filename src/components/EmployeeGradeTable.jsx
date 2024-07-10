/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";

function EmployeeGradeTable({ employeeData }) {
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
        <td>test</td>
      </tr>
    </tbody>
  </Table>;
}

export default EmployeeGradeTable;
