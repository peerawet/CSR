/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployeeData } from "../data/employeeData";
import Form from "react-bootstrap/Form";
import React from "react";

function KpiReport() {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const fetchEmployeeData = async () => {
    try {
      const fetchResult = await getEmployeeData();
      setEmployeeData(fetchResult);
    } catch (error) {
      alert("Error fetching employee data: " + error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Get unique departments from employeeData
  const departments = [
    ...new Set(employeeData.map((employee) => employee.department)),
  ];

  const handleDepartmentChange = (event) => {
    const selected = event.target.value;
    if (selected === "ทั้งหมด") {
      setSelectedDepartment(""); // Set selectedDepartment to empty string to fetch all data
    } else {
      setSelectedDepartment(selected);
    }
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
          <option>ทั้งหมด</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
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
          {employeeData
            .filter(
              (employee) =>
                selectedDepartment === "" ||
                employee.department === selectedDepartment
            )
            .map((employee, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan={3}>{index + 1}</td>
                  <td rowSpan={3}>{employee.name}</td>
                  <td rowSpan={3}>{employee.rank}</td>
                  <td>ผลการดำเนินงานจากตัวชี้วัด Departmental KPI</td>
                  <td>{employee.departmental.kpi}</td>
                  <td>30%</td>
                  <td>
                    {(
                      employee.departmental.kpi * employee.departmental.weight
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td key={`${index}-individual`}>
                    ผลการดำเนินงานจากตัวชี้วัด Individual KPI
                  </td>
                  <td>{employee.individual.kpi}</td>
                  <td>70%</td>
                  <td>
                    {(
                      employee.individual.kpi * employee.individual.weight
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
                      employee.departmental.kpi * employee.departmental.weight +
                      employee.individual.kpi * employee.individual.weight
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
