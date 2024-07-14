import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EmployeesKpiToolsContext = createContext();
const useEmployeesKpiTools = () => useContext(EmployeesKpiToolsContext);

function EmployeesKpiToolsProvider(props) {
  const [departments, setDepartments] = useState([]);

  const [weights, setWeights] = useState({
    departmental_kpi_weight: 0,
    individual_kpi_weight: 0,
  });

  const [kpiStatistics, setKpiStatistics] = useState({
    kpiAverage: 0,
    kpiSD: 0,
    kpiPlus1SD: 0,
    kpiMinus1SD: 0,
    kpiPlus2SD: 0,
    kpiMinus2SD: 0,
  });

  const [gradeCount, setGradeCount] = useState({
    APlus: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  });
  const newGradeCount = {
    APlus: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };
  const calculateGradeCounts = (employeeData) => {
    employeeData.forEach((employee) => {
      const kpi =
        employee.departments.departmental_kpi *
          weights.departmental_kpi_weight +
        employee.individual_kpi * weights.individual_kpi_weight;

      if (kpi >= kpiStatistics.kpiPlus2SD) {
        newGradeCount.APlus += 1;
      } else if (kpi >= kpiStatistics.kpiPlus1SD) {
        newGradeCount.A += 1;
      } else if (kpi >= kpiStatistics.kpiAverage) {
        newGradeCount.B += 1;
      } else if (kpi >= kpiStatistics.kpiMinus1SD) {
        newGradeCount.C += 1;
      } else if (kpi >= kpiStatistics.kpiMinus2SD) {
        newGradeCount.D += 1;
      } else {
        newGradeCount.F += 1;
      }
    });

    setGradeCount(newGradeCount);
  };

  const calculateStatistics = (data) => {
    if (!data || data.length === 0) {
      setKpiStatistics({
        kpiAverage: 0,
        kpiSD: 0,
        kpiPlus1SD: 0,
        kpiMinus1SD: 0,
        kpiPlus2SD: 0,
        kpiMinus2SD: 0,
      });
      return; // Exit the function early if there's no data
    }

    const kpiValues = data.map(
      (employee) =>
        employee.departments.departmental_kpi *
          weights.departmental_kpi_weight +
        employee.individual_kpi * weights.individual_kpi_weight
    );

    const avg = kpiValues.reduce((acc, val) => acc + val, 0) / kpiValues.length;
    const variance =
      kpiValues.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) /
      (kpiValues.length - 1);
    const sd = Math.sqrt(variance);

    setKpiStatistics({
      kpiAverage: avg,
      kpiSD: sd,
      kpiPlus1SD: avg + sd,
      kpiMinus1SD: avg - sd,
      kpiPlus2SD: avg + 2 * sd,
      kpiMinus2SD: avg - 2 * sd,
    });
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "https://csr-api-express.onrender.com/departments/get-department"
      );
      setDepartments(response.data);
      if (departments.length > 0) {
        console.log(departments);
        const allDepartmentIds = departments.map((d) => d.id).join(",");
        setSelectedDepartment(allDepartmentIds);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchEmployeeData = async (selectedDepartment, setEmployeeData) => {
    try {
      let url =
        "https://csr-api-express.onrender.com/employees/get-employee-kpi";
      if (selectedDepartment) {
        url += `?department-id=${selectedDepartment}`;
      }

      const response = await axios.get(url);
      const sortedData = response.data.sort((a, b) => {
        const aWeightedScore =
          a.departments.departmental_kpi * weights.departmental_kpi_weight +
          a.individual_kpi * weights.individual_kpi_weight;
        const bWeightedScore =
          b.departments.departmental_kpi * weights.departmental_kpi_weight +
          b.individual_kpi * weights.individual_kpi_weight;

        return bWeightedScore - aWeightedScore;
      });
      setEmployeeData(sortedData);
    } catch (error) {
      alert("Error fetching employee data: " + error);
    }
  };

  const fetchWeights = async () => {
    try {
      const response = await axios.get(
        "https://csr-api-express.onrender.com/configs/get-kpi-weight"
      );

      const { departmental_kpi_weight, individual_kpi_weight } =
        response.data[0];
      setWeights({ departmental_kpi_weight, individual_kpi_weight });
    } catch (error) {
      console.error("Error fetching KPI weights:", error);
    }
  };
  useEffect(() => {
    fetchDepartments();
    fetchWeights();
  }, []);

  return (
    <EmployeesKpiToolsContext.Provider
      value={{
        departments,
        setDepartments,
        weights,
        setWeights,
        kpiStatistics,
        setKpiStatistics,
        fetchEmployeeData,
        fetchDepartments,
        calculateStatistics,
        gradeCount,
        setGradeCount,
        calculateGradeCounts,
      }}
    >
      {props.children}
    </EmployeesKpiToolsContext.Provider>
  );
}

export { EmployeesKpiToolsProvider, useEmployeesKpiTools };
