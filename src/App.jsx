/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react"; // Use css from @emotion/react
import "./App.css";
import KpiReport from "./components/KpiReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab
          eventKey="รายงาน Departmental KPI & Individual KPI ของหน่วยงาน"
          title="รายงาน Departmental KPI & Individual KPI ของหน่วยงาน"
        >
          <KpiReport></KpiReport>
        </Tab>
        <Tab
          eventKey="Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution ของกลุ่มตำแหน่ง"
          title="Report การตัดเกรดโดยอิงกลุ่ม แบบ Normal Curve Distribution ของกลุ่มตำแหน่ง"
        >
          Tab content for Profile
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
