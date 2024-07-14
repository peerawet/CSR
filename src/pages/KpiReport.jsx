/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import React from "react";
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";

function KpiReport() {
  const { departments, weights, fetchEmployeeData } = useEmployeesKpiTools();

  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const allDepartmentIds = departments.map((d) => d.id).join(",");
    console.log(departments);
    setSelectedDepartment(allDepartmentIds);
    fetchEmployeeData(allDepartmentIds, setEmployeeData);
  }, [departments]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchEmployeeData(selectedDepartment, setEmployeeData);
    }
  }, [selectedDepartment]);

  const handleDepartmentChange = (event) => {
    const selected = event.target.value;
    setSelectedDepartment(selected);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 20px;
        background-color: #f8f9fa;
        gap: 20px;
      `}
    >
      <div
        css={css`
          text-align: center;
          font-size: 1.5em;
          color: #333;
          margin-bottom: 20px;
        `}
      >
        รายงาน Departmental KPI & Individual KPI ของหน่วยงาน
      </div>
      <div
        css={css`
          display: flex;
          justify-content: right;
          gap: 10px;
        `}
      >
        <div>กรุณาเลือกหน่วยงาน</div>
        <Form.Select
          aria-label="เลือกหน่วยงาน"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          css={css`
            width: 300px;
          `}
        >
          <option value={departments.map((d) => d.id).join(",")}>
            ทั้งหมด
          </option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <Table
        striped
        bordered
        hover
        css={css`
          width: 80%;
          margin: auto;
          text-align: center;
        `}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
            <th>สรุปผลการดำเนินงานตาม KPI</th>
            <th>คะแนน</th>
            <th>น้ำหนัก</th>
            <th>คะแนนถ่วงน้ำหนัก</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={3}>{index + 1}</td>
                <td rowSpan={3}>{employee.name}</td>
                <td rowSpan={3}>{employee.rank}</td>
                <td>ผลการดำเนินงานจากตัวชี้วัด Departmental KPI</td>
                <td>{employee.departments.departmental_kpi}</td>
                <td>{(weights.departmental_kpi_weight * 100).toFixed(0)}%</td>
                <td>
                  {(
                    employee.departments.departmental_kpi *
                    weights.departmental_kpi_weight
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td key={`${index}-individual`}>
                  ผลการดำเนินงานจากตัวชี้วัด Individual KPI
                </td>
                <td>{employee.individual_kpi}</td>
                <td>{(weights.individual_kpi_weight * 100).toFixed(0)}%</td>
                <td>
                  {(
                    employee.individual_kpi * weights.individual_kpi_weight
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td key={`${index}-combined`} colSpan={2}>
                  ผลการดำเนินงานเมื่อปรับน้ำหนักรวมทั้ง Departmental KPI และ
                  Individual KPI
                </td>
                <td>100%</td>
                <td
                  css={css`
                    background-color: yellow !important; /* Use !important to override Bootstrap */
                  `}
                >
                  {(
                    employee.departments.departmental_kpi *
                      weights.departmental_kpi_weight +
                    employee.individual_kpi * weights.individual_kpi_weight
                  ).toFixed(2)}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default KpiReport;
