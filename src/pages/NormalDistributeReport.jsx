/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Select from "react-select";
import CustomChart from "../components/CustomChart";
import StatisticTable from "../components/StatisticTable";
import RefTable from "../components/RefTable";
import EmployeeGradeTable from "../components/EmployeeGradeTable";
import { useEmployeesKpiTools } from "../contexts/EmployeesKpiTool";

function NormalDistributeReport() {
  const { departments, fetchEmployeeData, calculateStatistics } =
    useEmployeesKpiTools();

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    if (departments.length > 0) {
      const options = departments.map((dept) => ({
        value: dept.id,
        label: dept.name,
      }));
      setDepartmentOptions(options);
    }
  }, [departments]);

  const handleDepartmentChange = (selectedOptions) => {
    if (selectedOptions.length === 0) {
      setSelectedDepartment([]); // Clear selected departments if nothing is selected
      setEmployeeData([]);
    } else {
      const selectedValues = selectedOptions.map((option) => option.value);
      const selectedDepartmentIds = selectedValues.map((d) => d).join(",");
      setSelectedDepartment(selectedDepartmentIds);
      fetchEmployeeData(selectedDepartmentIds, setEmployeeData);
    }
  };

  useEffect(() => {
    calculateStatistics();
  }, [employeeData]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

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
        Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution
        ของกลุ่มตำแหน่ง (1/2)
      </div>
      <Select
        options={departmentOptions}
        onChange={handleDepartmentChange}
        isMulti
        placeholder="Select Department"
        isClearable
      />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          @media (min-width: 992px) {
            /* Large screen styles */
            flex-direction: row;
          }
          gap: 20px; /* Adjust the gap as needed */
        `}
      >
        <div
          css={css`
            flex: 2;
          `}
        >
          <CustomChart employeeData={employeeData} />
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <StatisticTable employeeData={employeeData} />
        </div>
      </div>

      <RefTable employeeData={employeeData}></RefTable>

      <div
        css={css`
          text-align: center;
          font-size: 1.5em;
          color: #333;
          margin-bottom: 20px;
        `}
      >
        Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution
        ของกลุ่มตำแหน่ง (2/2)
      </div>

      <EmployeeGradeTable employeeData={employeeData}></EmployeeGradeTable>
    </div>
  );
}

export default NormalDistributeReport;
