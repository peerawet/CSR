/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import { getEmployeeData } from "../data/employeeData";
import StatisticTable from "./StatisticTable";
import CustomChart from "./CustomChart";
import RefTable from "./RefTable";
import EmployeeGradeTable from "./EmployeeGradeTable";

import Select from "react-select";

function NormalDistributeReport() {
  const [employeeData, setEmployeeData] = useState([]);
  const [displayEmployeeData, setDisplayEmployeeData] = useState([]);
  const [dataTransformed, setDataTransformed] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [kpiAverage, setKpiAverage] = useState(0);
  const [kpiSD, setKpiSD] = useState(0);
  const [kpiPlus1SD, setKpiPlus1SD] = useState(0);
  const [kpiMinus1SD, setKpiMinus1SD] = useState(0);
  const [kpiPlus2SD, setKpiPlus2SD] = useState(0);
  const [kpiMinus2SD, setKpiMinus2SD] = useState(0);

  useEffect(() => {
    fetchEmployeeData();
    setDataTransformed([]);
    setDisplayEmployeeData([]);
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const fetchResult = await getEmployeeData();

      setEmployeeData(fetchResult);
    } catch (error) {
      alert("Error fetching employee data: " + error);
    }
  };

  const calculateStatistics = (data) => {
    const kpiValues = data.map((d) => parseFloat(d.kpi));

    // Calculate average
    const avg = kpiValues.reduce((acc, val) => acc + val, 0) / kpiValues.length;

    // Calculate variance
    const variance =
      kpiValues.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) /
      kpiValues.length;

    // Calculate standard deviation
    const sd = Math.sqrt(variance);

    // Update state with calculated statistics
    setKpiAverage(avg);
    setKpiSD(sd);
    setKpiPlus1SD(avg + sd);
    setKpiMinus1SD(avg - sd);
    setKpiPlus2SD(avg + 2 * sd);
    setKpiMinus2SD(avg - 2 * sd);
  };

  const handleDepartmentChange = (selectedOptions) => {
    console.log(selectedOptions);
    if (selectedOptions.length === 0) {
      // Clear statistics when no departments are selected
      setKpiAverage(0);
      setKpiSD(0);
      setKpiPlus1SD(0);
      setKpiMinus1SD(0);
      setKpiPlus2SD(0);
      setKpiMinus2SD(0);
      setDataTransformed([]);
      setDisplayEmployeeData([]);
    } else {
      setSelectedDepartments(selectedOptions);
      const selectedValues = selectedOptions.map((option) => option.value);
      const filteredData = selectedValues.length
        ? employeeData.filter((emp) => selectedValues.includes(emp.department))
        : employeeData;
      const transformedData = filteredData.map((employee) => ({
        name: employee.name,
        department: employee.department,
        kpi: (
          employee.departmental.kpi * employee.departmental.weight +
          employee.individual.kpi * employee.individual.weight
        ).toFixed(2),
      }));
      setDataTransformed(transformedData);
      calculateStatistics(transformedData);
      setDisplayEmployeeData(filteredData);
    }
  };

  const departmentOptions = [
    ...new Set(employeeData.map((emp) => emp.department)),
  ].map((dept) => ({
    value: dept,
    label: dept,
  }));

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
          flex-direction: row;
          gap: 20px; /* Adjust the gap as needed */
        `}
      >
        <div
          css={css`
            flex: 2;
          `}
        >
          <CustomChart dataTransformed={dataTransformed} />
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <StatisticTable
            kpiAverage={kpiAverage}
            kpiSD={kpiSD}
            kpiPlus1SD={kpiPlus1SD}
            kpiMinus1SD={kpiMinus1SD}
            kpiPlus2SD={kpiPlus2SD}
            kpiMinus2SD={kpiMinus2SD}
          />
        </div>
      </div>

      <RefTable
        kpiAverage={kpiAverage}
        kpiSD={kpiSD}
        kpiPlus1SD={kpiPlus1SD}
        kpiMinus1SD={kpiMinus1SD}
        kpiPlus2SD={kpiPlus2SD}
        kpiMinus2SD={kpiMinus2SD}
        dataTransformed={dataTransformed}
      ></RefTable>

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

      <EmployeeGradeTable
        displayEmployeeData={displayEmployeeData}
        kpiAverage={kpiAverage}
        kpiSD={kpiSD}
        kpiPlus1SD={kpiPlus1SD}
        kpiMinus1SD={kpiMinus1SD}
        kpiPlus2SD={kpiPlus2SD}
        kpiMinus2SD={kpiMinus2SD}
      ></EmployeeGradeTable>
    </div>
  );
}

export default NormalDistributeReport;
