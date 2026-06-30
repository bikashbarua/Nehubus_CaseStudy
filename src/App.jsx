import React, { useState } from "react";

// ============================================================
// SURVEY DATA & SUB-COMPONENTS
// ============================================================

const PROJECT_TEAM = [
  { name: "Bikash Barua", id: "21BTechIT05" },
  { name: "Muhammad Saqib", id: "22BtechLIT03" },
  { name: "Lidiya Kurbah", id: "22BtechLIT08" },
  { name: "Nganthoiba Salam", id: "22BTechLIT04" },
  { name: "Harbamon Terang", id: "21BtechIT07" }
];

// 1. Commute & Transit Data
const CHART_FREQ = [
  { label: "Daily", value: 192 },
  { label: "Few Times", value: 35 },
  { label: "Rarely", value: 55 },
  { label: "Never", value: 6 }
];

const CHART_WAIT = [
  { label: "< 5m", value: 15 },
  { label: "5-10m", value: 81 },
  { label: "10-20m", value: 68 },
  { label: "> 20m", value: 124 }
];

// 2. Current Info & Issues Data
const CHART_DELAYS = [
  { label: "Frequently", value: 132 },
  { label: "Occasionally", value: 118 },
  { label: "No Delays", value: 38 }
];

const CHART_INFO = [
  { label: "Guessing based on time", percent: 49.7, color: "#ffffff" },
  { label: "No information available", percent: 19.8, color: "#71717a" },
  { label: "Bus stop schedules", percent: 16.7, color: "#a1a1aa" },
  { label: "Phone calls/texts", percent: 13.9, color: "#3f3f46" }
];

const CHART_PROBLEMS = [
  { label: "Uncertain bus arrival times", value: 172, percent: 59.7 },
  { label: "Long waiting times at stops", value: 151, percent: 52.4 },
  { label: "Delays without notification", value: 126, percent: 43.8 },
  { label: "Lack of communication", value: 126, percent: 43.8 },
  { label: "Safety concerns when waiting", value: 50, percent: 17.4 }
];

// 3. User Demand & Features Data
const CHART_REALTIME = [
  { label: "Yes, very helpful", percent: 93.1, color: "#ffffff" },
  { label: "Yes, somewhat", percent: 5.0, color: "#71717a" },
  { label: "No, not necessary", percent: 1.9, color: "#3f3f46" }
];

const CHART_REDUCTION = [
  { label: "5 (Extremely helpful)", percent: 74.0, color: "#ffffff" },
  { label: "4 (Very helpful)", percent: 11.5, color: "#a1a1aa" },
  { label: "3 (Neutral)", percent: 10.0, color: "#71717a" },
  { label: "2 / 1 (Low priority)", percent: 4.5, color: "#3f3f46" }
];

const CHART_FEATURES = [
  { label: "Real-time bus location", value: 250, percent: 86.8 },
  { label: "Notifications for delays", value: 179, percent: 62.2 },
  { label: "Estimated arrival time (ETA)", value: 162, percent: 56.3 },
  { label: "Safety alerts / details", value: 124, percent: 43.1 }
];

// --- Minimalist SVG Chart Components ---

function VerticalBarChart({ data, yMax = 200, yTicks = [0, 50, 100, 150, 200] }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
      <div style={{ height: "140px", position: "relative", width: "100%" }}>
        <svg width="100%" height="100%" viewBox="0 0 300 140" preserveAspectRatio="none" style={{ overflow: "visible" }}>
          {/* Grid lines */}
          {yTicks.map((tick, idx) => {
            const y = 120 - (tick / yMax) * 100;
            return (
              <g key={idx}>
                <line x1="25" y1={y} x2="295" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <text x="0" y={y + 3} fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">{tick}</text>
              </g>
            );
          })}
          {/* Bars */}
          {data.map((item, idx) => {
            const barWidth = 32;
            const spacing = (270 - data.length * barWidth) / (data.length - 1 || 1);
            const x = 25 + idx * (barWidth + spacing);
            const barHeight = (item.value / yMax) * 100;
            const y = 120 - barHeight;
            return (
              <g key={idx}>
                <rect x={x} y={y} width={barWidth} height={barHeight} fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                <text x={x + barWidth / 2} y={y - 6} fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{item.value}</text>
              </g>
            );
          })}
          <line x1="25" y1="120" x2="295" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "25px", marginTop: "4px" }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ flex: 1, textAnchor: "middle", fontSize: "0.75rem", color: "var(--text-secondary)", textAlign: "center" }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBarChart({ data }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
      {data.map((item, idx) => (
        <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "200px" }}>{item.label}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#ffffff" }}>{item.value} ({item.percent}%)</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${item.percent}%`, background: "#ffffff", borderRadius: "2px" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  let accumulatedPercent = 0;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
      <svg width="80" height="80" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
        {data.map((item, idx) => {
          const radius = 38;
          const circumference = 2 * Math.PI * radius;
          const strokeDashOffset = circumference - (item.percent / 100) * circumference;
          const rotation = (accumulatedPercent / 100) * 360;
          accumulatedPercent += item.percent;
          return (
            <circle
              key={idx}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashOffset}
              style={{
                transformOrigin: "center",
                transform: `rotate(${rotation}deg)`
              }}
            />
          );
        })}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "150px" }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: item.color }} />
            <span style={{ color: "var(--text-secondary)", flex: 1 }}>{item.label}</span>
            <strong style={{ color: "#ffffff", fontFamily: "var(--font-mono)" }}>{item.percent}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SYSTEM DESIGN SCHEMA CONFIGS
// ============================================================

const DB_SCHEMAS = {
  admin: {
    title: "Admin Schema",
    description: "Credentials for configuration settings and fleet management access.",
    columns: [
      { field: "adminId", type: "String (Unique)", desc: "Unique identifier for the admin account" },
      { field: "username", type: "String", desc: "Username for administrative portal access" },
      { field: "password", type: "String", desc: "Encrypted credential hash" }
    ]
  },
  users: {
    title: "Users Schema",
    description: "Commuter profiles utilized for access verification and alert notifications.",
    columns: [
      { field: "cardID", type: "String (Unique)", desc: "University identification card index key" },
      { field: "fullName", type: "String", desc: "Full name of the commuter" },
      { field: "email", type: "String", desc: "Registered email address" },
      { field: "mobileNumber", type: "String", desc: "Phone contact details" },
      { field: "dob", type: "Date", desc: "Date of birth parameters" },
      { field: "department", type: "String", desc: "Department affiliation" },
      { field: "password", type: "String", desc: "Encrypted portal access code" }
    ]
  },
  buses: {
    title: "Buses Schema",
    description: "Fleet registrations and matching directions.",
    columns: [
      { field: "busId", type: "String (Unique)", desc: "Primary key for transit buses" },
      { field: "busNumber", type: "String", desc: "License registration index" },
      { field: "direction", type: "String", desc: "Assigned pathway destination route" }
    ]
  },
  coordinates: {
    title: "Coordinates Schema",
    description: "GPS telemetry values pushed from actively transiting vehicles.",
    columns: [
      { field: "coordinateId", type: "String (Unique)", desc: "Autogenerated index key" },
      { field: "busId", type: "String", desc: "Associated bus ID reference" },
      { field: "latitude", type: "Float", desc: "Latitude parameter" },
      { field: "longitude", type: "Float", desc: "Longitude parameter" },
      { field: "timestamp", type: "Timestamp", desc: "Date/time registry of telemetry packet" }
    ]
  },
  drivers: {
    title: "Drivers Schema",
    description: "Driver accounts authorized to broadcast transit coordinates.",
    columns: [
      { field: "driverId", type: "String (Unique)", desc: "Unique driver identifier" },
      { field: "driver_name", type: "String", desc: "Full name details" },
      { field: "driver_email", type: "String", desc: "Driver application login username" },
      { field: "mobile_number", type: "String", desc: "Assigned contact details" },
      { field: "password", type: "String", desc: "Encrypted security credential" }
    ]
  },
  favoriteRoutes: {
    title: "Favorites Schema",
    description: "Custom notification bookmarks assigned to commuter profiles.",
    columns: [
      { field: "busId", type: "String", desc: "Reference code for bookmarked transit run" },
      { field: "startPoint", type: "String", desc: "Commuter boarding location" },
      { field: "enable_notification", type: "Boolean", desc: "Alert activation parameter" }
    ]
  },
  routes: {
    title: "Routes Schema",
    description: "Configured transit pathways and intermediate boundaries.",
    columns: [
      { field: "busId", type: "String", desc: "Associated bus index key" },
      { field: "busNumber", type: "String", desc: "Visual route registration text" },
      { field: "startPoint", type: "String", desc: "Starting terminus" },
      { field: "endPoint", type: "String", desc: "Concluding terminus" }
    ]
  }
};

const TEST_CASES = [
  { id: "UT-01", module: "Authentication", desc: "Verify login with valid credentials", expected: "Successful login & redirect", status: "Pass" },
  { id: "UT-02", module: "Authentication", desc: "Verify login with invalid credentials", expected: "Error alert display", status: "Pass" },
  { id: "UT-03", module: "Tracking", desc: "Check if the bus location updates in real-time", expected: "Coordinates update every 5 seconds", status: "Pass" },
  { id: "UT-04", module: "Favorites", desc: "Add a route to user favorites", expected: "Saves route bookmark details", status: "Pass" },
  { id: "UT-05", module: "Management", desc: "Register a new driver profile", expected: "Driver visible in administrative logs", status: "Pass" },
  { id: "UT-06", module: "Management", desc: "Register a new bus instance", expected: "Bus added to current active fleet", status: "Pass" },
  { id: "UT-07", module: "Management", desc: "Remove a decommissioned bus", expected: "Bus instance deleted from databases", status: "Pass" },
  { id: "UT-08", module: "Management", desc: "Remove an inactive driver profile", expected: "Driver account access revoked", status: "Pass" },
  { id: "UT-09", module: "Management", desc: "Update route path properties", expected: "Coordinates updated in route registry", status: "Pass" }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeDfdLevel, setActiveDfdLevel] = useState(0);
  const [activeDbTable, setActiveDbTable] = useState("users");
  
  // Mobile Simulator state
  const [simulatorApp, setSimulatorApp] = useState("student"); 
  const [simulatorScreen, setSimulatorScreen] = useState("dashboard"); 
  
  // Custom interactive tracking states in simulator
  const [simSelectedBus, setSimSelectedBus] = useState("Bus 2 (ML200000)");
  const [simDriverSharing, setSimDriverSharing] = useState(true);
  const [simFavorites, setSimFavorites] = useState([
    { id: "ML-05", start: "Mawlai", bus: "Bus 1" },
    { id: "ML-06", start: "Police Bazar", bus: "Bus 2" }
  ]);
  const [favInput, setFavInput] = useState({ bus: "Bus 2", start: "" });

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addFavoriteRoute = (e) => {
    e.preventDefault();
    if (!favInput.start) return;
    setSimFavorites([...simFavorites, { id: "ML-" + Date.now().toString().slice(-2), ...favInput }]);
    setFavInput({ bus: "Bus 2", start: "" });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Ambient background decoration */}
      <div className="bg-ambient" />

      {/* Navigation Header */}
      <nav className="sticky-nav">
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={{ fontSize: "1.05rem", fontFamily: "var(--font-display)", fontWeight: "600", color: "#ffffff", letterSpacing: "-0.01em" }}>
              NEHU TRACKER
            </h1>
            <span style={{ width: "1px", height: "14px", background: "rgba(255, 255, 255, 0.15)" }}></span>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              Case Study
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            IT Batch 2021 - 2025
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: "1000px", margin: "90px auto 0 auto", padding: "40px 24px" }}>
        
        {/* Banner credentials */}
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "40px", marginBottom: "40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "32px" }}>
            <div style={{ flex: "1 1 500px" }}>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
                Minor Project Report
              </span>
              <h2 style={{ fontSize: "2.75rem", fontFamily: "var(--font-display)", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.04em", fontWeight: "700" }}>
                University Bus Tracking App
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", maxWidth: "600px" }}>
                A documentation portal analyzing real-time GPS telemetry, mobile client flows, relational Firestore configurations, and student commute insights.
              </p>
            </div>
            
            <div style={{ width: "280px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <div style={{ marginBottom: "16px" }}>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "4px" }}>Authors</span>
                {PROJECT_TEAM.map((member, i) => (
                  <div key={i} style={{ color: "#ffffff", marginBottom: "2px" }}>
                    {member.name} <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>({member.id})</span>
                  </div>
                ))}
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "4px" }}>Supervisor</span>
                <strong style={{ color: "#ffffff", fontWeight: "500" }}>Prof. Dr. Bubu Bhuyan</strong>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Department of Information Technology, NEHU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation / Content Grid */}
        <div className="grid-cols-layout">
          
          {/* Navigation Sidebar */}
          <aside style={{ position: "sticky", top: "100px", height: "fit-content" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <button 
                onClick={() => handleNavClick("overview")} 
                className={`sidebar-link ${activeSection === "overview" ? "active" : ""}`}
              >
                Overview
              </button>
              <button 
                onClick={() => handleNavClick("objectives")} 
                className={`sidebar-link ${activeSection === "objectives" ? "active" : ""}`}
              >
                Problem & Goals
              </button>
              <button 
                onClick={() => handleNavClick("survey")} 
                className={`sidebar-link ${activeSection === "survey" ? "active" : ""}`}
              >
                Survey Data
              </button>
              <button 
                onClick={() => handleNavClick("architecture")} 
                className={`sidebar-link ${activeSection === "architecture" ? "active" : ""}`}
              >
                DFD Architecture
              </button>
              <button 
                onClick={() => handleNavClick("database")} 
                className={`sidebar-link ${activeSection === "database" ? "active" : ""}`}
              >
                Schema Design
              </button>
              <button 
                onClick={() => handleNavClick("simulator")} 
                className={`sidebar-link ${activeSection === "simulator" ? "active" : ""}`}
              >
                App Simulator
              </button>
              <button 
                onClick={() => handleNavClick("testing")} 
                className={`sidebar-link ${activeSection === "testing" ? "active" : ""}`}
              >
                Test Suite
              </button>
              <button 
                onClick={() => handleNavClick("conclusions")} 
                className={`sidebar-link ${activeSection === "conclusions" ? "active" : ""}`}
              >
                Future Scope
              </button>
            </div>
          </aside>

          {/* Main Articles */}
          <main className="main-content-area" style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            
            {/* OVERVIEW */}
            <section id="overview" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px", fontWeight: "600" }}>Project Overview</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p>
                  Commuting within large universities presents operational issues such as unpredictable delay lines and long waiting intervals at remote transit stops. The <strong>NEHU Bus Tracking App</strong> provides students and administration with active tracking, replacing paper schedules with live updates.
                </p>
                <div style={{ borderLeft: "2px solid rgba(255, 255, 255, 0.15)", paddingLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>
                  <p style={{ fontStyle: "italic", fontSize: "0.92rem", color: "#d4d4d8", lineHeight: "1.7" }}>
                    "The system leverages GPS telemetry, Firestore real-time storage, and Flutter cross-platform applications. Key aspects include location sharing client scripts for drivers, search dashboards for students, and configuration controls for administrative staff."
                  </p>
                </div>
                <p>
                  Connecting client endpoints directly to active telemetry coordinates removes spatial guesswork and helps passengers better manage boarding schedules.
                </p>
              </div>
            </section>

            {/* PROBLEM & OBJECTIVES */}
            <section id="objectives" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>Constraints & Goals</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                <div>
                  <h4 style={{ color: "#ffffff", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                    Identified Problems
                  </h4>
                  <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    <li><strong>Unpredictable Arrival:</strong> Lack of active tracking triggers long waiting blocks.</li>
                    <li><strong>Fleet Imbalance:</strong> Unequal passenger volume peaks during morning commutes.</li>
                    <li><strong>Delayed Updates:</strong> Technical failures or route changes remain uncommunicated.</li>
                    <li><strong>Management Blindspots:</strong> Admins lack statistics on route efficiency.</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: "#ffffff", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                    System Objectives
                  </h4>
                  <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    <li><strong>GPS Synchronization:</strong> Maintain active telemetry with minimal refresh delays.</li>
                    <li><strong>Commuter Alerts:</strong> Allow passengers to bookmark routes and monitor local timetables.</li>
                    <li><strong>Central Configuration:</strong> Enable administrators to configure routes, fleet listings, and driver listings.</li>
                    <li><strong>Cross-Platform Build:</strong> Distribute on both Android and iOS targets using a Flutter code model.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SURVEY DATA */}
            <section id="survey" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "12px" }}>Commuter Survey Insights</h3>
              <p style={{ marginBottom: "28px" }}>
                Prior to development, the team evaluated responses from <strong>288 campus participants</strong>. The results highlight constraints with the current transit system:
              </p>

              {/* Minimalist Grid of All 8 Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
                
                {/* 1. Frequency of Bus Usage */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Frequency of Bus Usage</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Total Responses: 288</span>
                  <VerticalBarChart data={CHART_FREQ} yMax={200} yTicks={[0, 50, 100, 150, 200]} />
                </div>

                {/* 2. Average Waiting Time */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Average Waiting Time at Stop</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Total Responses: 288</span>
                  <VerticalBarChart data={CHART_WAIT} yMax={150} yTicks={[0, 25, 50, 75, 100, 125, 150]} />
                </div>

                {/* 3. Delays Experienced */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Delays Due to Lack of Info</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Total Responses: 288</span>
                  <VerticalBarChart data={CHART_DELAYS} yMax={150} yTicks={[0, 50, 100, 150]} />
                </div>

                {/* 4. Current Info Retrieval */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Current Information Sources</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Total Responses: 288</span>
                  <DonutChart data={CHART_INFO} />
                </div>

                {/* 5. Common Problems Faced */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Common Problems Faced</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Select all that apply</span>
                  <HorizontalBarChart data={CHART_PROBLEMS} />
                </div>

                {/* 6. Utility of Real-time Info */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Demand for Real-Time Telemetry</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Total Responses: 288</span>
                  <DonutChart data={CHART_REALTIME} />
                </div>

                {/* 7. Reduction in Uncertainty */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Uncertainty Reduction Impact</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Rating 1 (Low) to 5 (High)</span>
                  <DonutChart data={CHART_REDUCTION} />
                </div>

                {/* 8. Desired Features */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: "600", marginBottom: "4px" }}>Desired Application Features</h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Select all that apply</span>
                  <HorizontalBarChart data={CHART_FEATURES} />
                </div>

              </div>
            </section>

            {/* DFD ARCHITECTURE */}
            <section id="architecture" style={{ scrollMarginTop: "120px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.5rem", color: "#ffffff" }}>Data Flow Architecture</h3>
                
                {/* Switcher DFD */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <button 
                    onClick={() => setActiveDfdLevel(0)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: activeDfdLevel === 0 ? "#ffffff" : "var(--text-secondary)",
                      fontSize: "0.8rem",
                      fontWeight: activeDfdLevel === 0 ? "600" : "400",
                      cursor: "pointer"
                    }}
                  >
                    Level 0
                  </button>
                  <button 
                    onClick={() => setActiveDfdLevel(1)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: activeDfdLevel === 1 ? "#ffffff" : "var(--text-secondary)",
                      fontSize: "0.8rem",
                      fontWeight: activeDfdLevel === 1 ? "600" : "400",
                      cursor: "pointer"
                    }}
                  >
                    Level 1
                  </button>
                </div>
              </div>

              <p style={{ marginBottom: "28px" }}>
                Functional architecture outlining data exchanges between entities, the processing module, and databases.
              </p>

              {/* Minimal Line DFD */}
              <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", padding: "10px 0" }}>
                {activeDfdLevel === 0 ? (
                  /* LEVEL 0 DFD SVG - MINIMALIST */
                  <svg width="500" height="320" viewBox="0 0 500 320" style={{ maxWidth: "100%", height: "auto" }}>
                    <defs>
                      <marker id="arrowMinimal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#52525b" />
                      </marker>
                    </defs>

                    {/* Center Process */}
                    <g>
                      <rect x="180" y="130" width="140" height="60" rx="3" fill="transparent" stroke="#ffffff" strokeWidth="1" />
                      <text x="250" y="160" textAnchor="middle" fill="#ffffff" fontWeight="500" fontSize="11" fontFamily="var(--font-sans)" letterSpacing="0.05em">BUS SYSTEM</text>
                      <text x="250" y="174" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">PROCESS 1.0</text>
                    </g>

                    {/* Driver Node */}
                    <g>
                      <rect x="180" y="20" width="140" height="40" fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="250" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" letterSpacing="0.05em">DRIVER</text>
                    </g>

                    {/* Database Node */}
                    <g>
                      <rect x="180" y="260" width="140" height="40" fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="250" y="284" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" letterSpacing="0.05em">FIRESTORE</text>
                    </g>

                    {/* Admin Node */}
                    <g>
                      <rect x="20" y="140" width="100" height="40" fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="70" y="164" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" letterSpacing="0.05em">ADMIN</text>
                    </g>

                    {/* Users Node */}
                    <g>
                      <rect x="380" y="140" width="100" height="40" fill="transparent" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="430" y="164" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" letterSpacing="0.05em">STUDENT</text>
                    </g>

                    {/* Arrows */}
                    <g style={{ stroke: "#3f3f46", strokeWidth: "1", fill: "none" }}>
                      <path d="M 250 60 L 250 130" markerEnd="url(#arrowMinimal)" />
                      <path d="M 250 190 L 250 260" markerEnd="url(#arrowMinimal)" />
                      <path d="M 120 160 L 180 160" markerEnd="url(#arrowMinimal)" />
                      <path d="M 320 160 L 380 160" markerEnd="url(#arrowMinimal)" />
                    </g>
                  </svg>
                ) : (
                  /* LEVEL 1 DFD SVG - MINIMALIST */
                  <svg width="550" height="340" viewBox="0 0 550 340" style={{ maxWidth: "100%", height: "auto" }}>
                    <g fill="none" stroke="var(--border-color)" strokeWidth="1">
                      {/* Left Column Entities */}
                      <rect x="10" y="40" width="80" height="30" />
                      <text x="50" y="58" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">STUDENT</text>

                      <rect x="10" y="150" width="80" height="30" />
                      <text x="50" y="168" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">ADMIN</text>

                      <rect x="10" y="260" width="80" height="30" />
                      <text x="50" y="278" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">DRIVER</text>

                      {/* Central Actions */}
                      <circle cx="180" cy="55" r="18" stroke="#ffffff" />
                      <text x="180" y="58" textAnchor="middle" fill="#ffffff" fontSize="7">LOGIN</text>

                      <circle cx="180" cy="165" r="18" stroke="#ffffff" />
                      <text x="180" y="168" textAnchor="middle" fill="#ffffff" fontSize="7">MANAGE</text>

                      <circle cx="180" cy="275" r="18" stroke="#ffffff" />
                      <text x="180" y="278" textAnchor="middle" fill="#ffffff" fontSize="7">UPDATE</text>

                      {/* Central DB */}
                      <rect x="290" y="145" width="90" height="40" />
                      <text x="335" y="168" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">DATABASE</text>

                      {/* Right UI outputs */}
                      <rect x="460" y="40" width="80" height="30" />
                      <text x="500" y="58" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">MAP VIEW</text>

                      <rect x="460" y="110" width="80" height="30" />
                      <text x="500" y="128" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">SEARCH</text>

                      <rect x="460" y="180" width="80" height="30" />
                      <text x="500" y="198" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">LIVE COORD</text>

                      <rect x="460" y="250" width="80" height="30" />
                      <text x="500" y="268" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">FAVORITES</text>
                    </g>

                    {/* Pathways lines */}
                    <g stroke="#3f3f46" strokeWidth="1" fill="none">
                      <path d="M 90 55 L 162 55" />
                      <path d="M 90 165 L 162 165" />
                      <path d="M 90 275 L 162 275" />

                      <path d="M 198 55 L 290 150" />
                      <path d="M 198 165 L 290 165" />
                      <path d="M 198 275 L 290 180" />

                      <path d="M 380 155 L 460 55" />
                      <path d="M 380 165 L 460 125" />
                      <path d="M 380 170 L 460 195" />
                      <path d="M 380 180 L 460 265" />
                    </g>
                  </svg>
                )}
              </div>
            </section>

            {/* SCHEMA DESIGN */}
            <section id="database" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>Database Schemas</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px" }}>
                {/* Left schema selection list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {Object.keys(DB_SCHEMAS).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveDbTable(key)}
                      className={`db-table-btn ${activeDbTable === key ? "active" : ""}`}
                    >
                      {DB_SCHEMAS[key].title}
                    </button>
                  ))}
                </div>

                {/* Right schema details table */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "24px" }}>
                  {(() => {
                    const tbl = DB_SCHEMAS[activeDbTable];
                    return (
                      <div>
                        <h4 style={{ fontSize: "1rem", color: "#ffffff", fontFamily: "var(--font-display)", marginBottom: "6px" }}>
                          {tbl.title}
                        </h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                          {tbl.description}
                        </p>

                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                            <thead>
                              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-primary)" }}>
                                <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "600", color: "#ffffff" }}>Field</th>
                                <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "600", width: "110px" }}>Type</th>
                                <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "600" }}>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tbl.columns.map((col, idx) => (
                                <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", color: "var(--text-secondary)" }}>
                                  <td style={{ padding: "8px 0", fontFamily: "var(--font-mono)", color: "#ffffff" }}>{col.field}</td>
                                  <td style={{ padding: "8px 0", fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: "0.78rem" }}>{col.type}</td>
                                  <td style={{ padding: "8px 0" }}>{col.desc}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </section>

            {/* APP SIMULATOR */}
            <section id="simulator" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>User Interface Simulator</h3>
              <p style={{ marginBottom: "28px" }}>
                Select an active role below to monitor the telemetry data flow inside the simulated smartphone preview:
              </p>

              {/* Simulator wrapper */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center", alignItems: "flex-start" }}>
                
                {/* Simulator controls */}
                <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
                      Sub-App Module
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <button
                        onClick={() => { setSimulatorApp("student"); setSimulatorScreen("dashboard"); }}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "4px",
                          background: simulatorApp === "student" ? "rgba(255, 255, 255, 0.04)" : "transparent",
                          border: `1px solid ${simulatorApp === "student" ? "rgba(255, 255, 255, 0.15)" : "transparent"}`,
                          color: simulatorApp === "student" ? "#ffffff" : "var(--text-secondary)",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: "500"
                        }}
                      >
                        Student App
                      </button>

                      <button
                        onClick={() => { setSimulatorApp("driver"); setSimulatorScreen("sharing"); }}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "4px",
                          background: simulatorApp === "driver" ? "rgba(255, 255, 255, 0.04)" : "transparent",
                          border: `1px solid ${simulatorApp === "driver" ? "rgba(255, 255, 255, 0.15)" : "transparent"}`,
                          color: simulatorApp === "driver" ? "#ffffff" : "var(--text-secondary)",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: "500"
                        }}
                      >
                        Driver App
                      </button>

                      <button
                        onClick={() => { setSimulatorApp("admin"); setSimulatorScreen("dashboard"); }}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "4px",
                          background: simulatorApp === "admin" ? "rgba(255, 255, 255, 0.04)" : "transparent",
                          border: `1px solid ${simulatorApp === "admin" ? "rgba(255, 255, 255, 0.15)" : "transparent"}`,
                          color: simulatorApp === "admin" ? "#ffffff" : "var(--text-secondary)",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: "500"
                        }}
                      >
                        Admin Portal
                      </button>
                    </div>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
                      Active View
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {simulatorApp === "student" && (
                        <>
                          <button onClick={() => setSimulatorScreen("welcome")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "welcome" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Welcome</button>
                          <button onClick={() => setSimulatorScreen("dashboard")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "dashboard" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Dashboard</button>
                          <button onClick={() => setSimulatorScreen("map")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "map" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Map</button>
                          <button onClick={() => setSimulatorScreen("favorites")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "favorites" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Favorites</button>
                          <button onClick={() => setSimulatorScreen("schedules")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "schedules" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Schedules</button>
                        </>
                      )}
                      {simulatorApp === "driver" && (
                        <>
                          <button onClick={() => setSimulatorScreen("login")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "login" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Login</button>
                          <button onClick={() => setSimulatorScreen("sharing")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "sharing" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Broadcast</button>
                        </>
                      )}
                      {simulatorApp === "admin" && (
                        <>
                          <button onClick={() => setSimulatorScreen("dashboard")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "dashboard" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Menu</button>
                          <button onClick={() => setSimulatorScreen("addroute")} style={{ fontSize: "0.75rem", padding: "4px 8px", borderRadius: "2px", background: simulatorScreen === "addroute" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)", border: "none", color: "#fff", cursor: "pointer" }}>Add Route</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Smartphone Preview Mockup */}
                <div style={{
                  width: "260px",
                  height: "500px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "20px",
                  background: "#0c0c0e",
                  position: "relative",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* Status header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontWeight: "500", fontSize: "0.68rem", color: "#ffffff", fontFamily: "var(--font-mono)" }}>NEHU BUS</span>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: simDriverSharing ? "#a5b4fc" : "#ef4444" }}></span>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>12:00</span>
                    </div>
                  </div>

                  {/* Simulator Screen Content */}
                  <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", fontSize: "0.78rem" }}>
                    
                    {/* Welcome Screen */}
                    {simulatorApp === "student" && simulatorScreen === "welcome" && (
                      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                        <div style={{ fontSize: "2.5rem", color: "#ffffff", marginBottom: "16px" }}>⚪</div>
                        <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "4px" }}>Welcome</h4>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginBottom: "20px" }}>NEHU Tracking Services</p>
                        <button onClick={() => setSimulatorScreen("dashboard")} style={{ padding: "8px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px", cursor: "pointer", fontSize: "0.75rem", marginBottom: "6px" }}>Login</button>
                      </div>
                    )}

                    {/* Student Dashboard */}
                    {simulatorApp === "student" && simulatorScreen === "dashboard" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", marginBottom: "6px" }}>
                          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>ACTIVE TELEMETRY</span>
                          <div style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.85rem", marginTop: "2px" }}>2 Buses Operational</div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div onClick={() => setSimulatorScreen("map")} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>
                            Live Tracker
                          </div>
                          <div onClick={() => setSimulatorScreen("favorites")} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>
                            Favorites Stops
                          </div>
                          <div onClick={() => setSimulatorScreen("schedules")} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>
                            Schedules
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Live map */}
                    {simulatorApp === "student" && simulatorScreen === "map" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                        <select 
                          value={simSelectedBus}
                          onChange={(e) => setSimSelectedBus(e.target.value)}
                          style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }}
                        >
                          <option value="Bus 2 (ML200000)">Bus 2 (ML200000)</option>
                          <option value="Bus 1 (ML100000)">Bus 1 (ML100000)</option>
                        </select>

                        {/* Map drawing */}
                        <div style={{ flex: 1, minHeight: "150px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", position: "relative", overflow: "hidden" }}>
                          <svg width="100%" height="100%" viewBox="0 0 200 150">
                            <path d="M 20 120 C 60 20, 140 130, 180 30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                            <path d="M 20 120 C 60 20, 140 130, 180 30" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4 4" />
                            
                            {/* Stations */}
                            <circle cx="20" cy="120" r="3" fill="#ffffff" />
                            <circle cx="100" cy="75" r="3" fill="#ffffff" />
                            <circle cx="180" cy="30" r="3" fill="#ffffff" />
                            
                            {/* Bus position */}
                            {simDriverSharing ? (
                              <g>
                                <circle cx="100" cy="75" r="5" fill="#a5b4fc" />
                                <text x="100" y="65" fontSize="7" fill="#fff" textAnchor="middle">Bus 2</text>
                              </g>
                            ) : (
                              <text x="100" y="75" fontSize="7" fill="var(--text-muted)" textAnchor="middle">Offline</text>
                            )}
                          </svg>
                        </div>

                        <div style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "4px", fontSize: "0.72rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Status:</span>
                            <span style={{ color: simDriverSharing ? "#ffffff" : "var(--text-muted)" }}>
                              {simDriverSharing ? "Active Broadcast" : "Offline"}
                            </span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                            <span>Telemetry Distance:</span>
                            <span style={{ color: "var(--text-secondary)" }}>{simDriverSharing ? "16 meters" : "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Favorites stop */}
                    {simulatorApp === "student" && simulatorScreen === "favorites" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>BOOKMARKED</span>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          {simFavorites.map((fav, idx) => (
                            <div key={idx} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", padding: "8px 10px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                <div style={{ color: "#fff", fontWeight: "500", fontSize: "0.72rem" }}>{fav.start}</div>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{fav.bus}</div>
                              </div>
                              <button 
                                onClick={() => setSimFavorites(simFavorites.filter(f => f.id !== fav.id))}
                                style={{ padding: "2px 4px", background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "0.65rem", cursor: "pointer" }}
                              >
                                remove
                              </button>
                            </div>
                          ))}
                        </div>

                        <form onSubmit={addFavoriteRoute} style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <input 
                            type="text" 
                            placeholder="Add stop name..."
                            value={favInput.start} 
                            onChange={(e) => setFavInput({ ...favInput, start: e.target.value })}
                            style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} 
                          />
                          <button type="submit" style={{ padding: "6px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", fontSize: "0.72rem", cursor: "pointer" }}>Save</button>
                        </form>
                      </div>
                    )}

                    {/* Schedules screen */}
                    {simulatorApp === "student" && simulatorScreen === "schedules" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>TIMETABLES</span>
                        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", padding: "8px", borderRadius: "4px" }}>
                          <div style={{ color: "#fff", fontWeight: "500" }}>Bus 2 (ML200000)</div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "2px" }}>Polo Stop: 1:33 AM</div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>NEHU Campus: 3:33 AM</div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", padding: "8px", borderRadius: "4px" }}>
                          <div style={{ color: "#fff", fontWeight: "500" }}>Bus 1 (ML100000)</div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "2px" }}>Mawlai Stop: 8:00 AM</div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>NEHU Campus: 9:00 AM</div>
                        </div>
                      </div>
                    )}

                    {/* Driver Login */}
                    {simulatorApp === "driver" && simulatorScreen === "login" && (
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: "10px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center" }}>DRIVER PORTAL</span>
                        <input type="text" placeholder="Driver Email" style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} />
                        <input type="password" placeholder="Password" style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} />
                        <button onClick={() => setSimulatorScreen("sharing")} style={{ padding: "8px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", cursor: "pointer", fontSize: "0.75rem" }}>Login</button>
                      </div>
                    )}

                    {/* Driver sharing location screen */}
                    {simulatorApp === "driver" && simulatorScreen === "sharing" && (
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: "16px", textAlign: "center" }}>
                        <button
                          onClick={() => setSimDriverSharing(!simDriverSharing)}
                          style={{
                            padding: "10px",
                            background: "transparent",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            cursor: "pointer"
                          }}
                        >
                          {simDriverSharing ? "Disable GPS Broadcast" : "Enable GPS Broadcast"}
                        </button>

                        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", padding: "8px", borderRadius: "4px", fontSize: "0.68rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "2px" }}>
                          <div>Lat: 25.60830</div>
                          <div>Lng: 91.89097</div>
                          <div style={{ marginTop: "4px", color: simDriverSharing ? "#ffffff" : "var(--text-muted)" }}>
                            GPS: {simDriverSharing ? "ACTIVE" : "OFFLINE"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Admin Portal Dashboard */}
                    {simulatorApp === "admin" && simulatorScreen === "dashboard" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>ADMIN OPTIONS</span>
                        <div onClick={() => setSimulatorScreen("addroute")} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>
                          Configure Routes
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "4px", opacity: 0.5 }}>
                          Configure Drivers
                        </div>
                      </div>
                    )}

                    {/* Admin Add Route */}
                    {simulatorApp === "admin" && simulatorScreen === "addroute" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>NEW ROUTE</span>
                        <input type="text" placeholder="Route ID" style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} />
                        <input type="text" placeholder="Start Point" style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} />
                        <input type="text" placeholder="End Point" style={{ padding: "6px", borderRadius: "2px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.75rem" }} />
                        <button 
                          onClick={() => {
                            alert("Route properties saved.");
                            setSimulatorScreen("dashboard");
                          }} 
                          style={{ padding: "8px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", cursor: "pointer", fontSize: "0.75rem" }}
                        >
                          Save settings
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </section>

            {/* TEST SUITE */}
            <section id="testing" style={{ scrollMarginTop: "120px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>Verification & Quality Controls</h3>
              <p style={{ marginBottom: "24px" }}>
                Integrity metrics verified across user, driver, and administrator access pathways:
              </p>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}>
                      <th style={{ padding: "8px 0", fontWeight: "600", width: "70px" }}>Test ID</th>
                      <th style={{ padding: "8px 0", fontWeight: "600", width: "130px" }}>Module</th>
                      <th style={{ padding: "8px 0", fontWeight: "600" }}>Description</th>
                      <th style={{ padding: "8px 0", fontWeight: "600", width: "140px" }}>Expected Outcomes</th>
                      <th style={{ padding: "8px 0", fontWeight: "600", width: "50px", textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEST_CASES.map((tc, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", color: "var(--text-secondary)" }}>
                        <td style={{ padding: "10px 0", fontFamily: "var(--font-mono)", color: "#ffffff" }}>{tc.id}</td>
                        <td style={{ padding: "10px 0", fontWeight: "500" }}>{tc.module}</td>
                        <td style={{ padding: "10px 0" }}>{tc.desc}</td>
                        <td style={{ padding: "10px 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>{tc.expected}</td>
                        <td style={{ padding: "10px 0", textAlign: "right" }}>
                          <span style={{
                            fontSize: "0.78rem",
                            fontFamily: "var(--font-mono)",
                            color: "#ffffff"
                          }}>
                            {tc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FUTURE SCOPE */}
            <section id="conclusions" style={{ scrollMarginTop: "120px", marginBottom: "80px" }}>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>Conclusion & Future Scope</h3>
              <p style={{ marginBottom: "24px" }}>
                The current Flutter application sets the foundation for tracking transit runs. The report projects these enhancements for future revisions:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                <div style={{ borderLeft: "1px solid var(--border-color)", paddingLeft: "16px" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#ffffff", marginBottom: "6px" }}>AI Route Estimates</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Introduce machine learning prediction models to evaluate traffic variables and estimate delays at stops.</p>
                </div>
                
                <div style={{ borderLeft: "1px solid var(--border-color)", paddingLeft: "16px" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#ffffff", marginBottom: "6px" }}>Geofenced Alarms</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Integrate boundary triggers notifying devices when a vehicle approaches a boarding point.</p>
                </div>

                <div style={{ borderLeft: "1px solid var(--border-color)", paddingLeft: "16px" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#ffffff", marginBottom: "6px" }}>Multi-language Support</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Add localization configuration properties inside mobile clients to support regional dialects.</p>
                </div>
              </div>
            </section>

          </main>

        </div>

      </div>
    </div>
  );
}
