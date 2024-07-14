/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react"; // Use css from @emotion/react
import "./App.css";
import KpiReport from "./pages/KpiReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NormalDistributeReport from "./pages/NormalDistributeReport";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tabs
        defaultActiveKey="รายงาน Departmental KPI & Individual KPI ของหน่วยงาน"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab
          eventKey="รายงาน Departmental KPI & Individual KPI ของหน่วยงาน"
          title="รายงาน Departmental KPI & Individual KPI ของหน่วยงาน"
        >
          <KpiReport />
        </Tab>
        <Tab
          eventKey="Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution ของกลุ่มตำแหน่ง"
          title="Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution ของกลุ่มตำแหน่ง"
        >
          <NormalDistributeReport />
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
