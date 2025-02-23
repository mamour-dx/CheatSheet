import { Link } from "react-router-dom";
import ThemeIcon from "../theme-icon/ThemeIcon.jsx";
import "./Navbar.css";
import { useState, useMemo } from "react";
import Bar from "./Bar.jsx";
import { FaSheetPlastic } from "react-icons/fa6";
import { PiCoffeeBold } from "react-icons/pi";

function Navbar() {
    // State to handle the dropdown menu visibility
    const [open, setOpen] = useState(false);

    // Using useMemo to optimize the technologies list so it doesn't get recalculated on every render
    const technologies = useMemo(() => [
        { name: "C", directory: "c", path: "c/basics", icon: "c.svg", color: "#3848A9" },
        { name: "C++", directory: "cpp", path: "cpp/basics", icon: "cpp.svg", color: "#0086D4" },
        { name: "C#", directory: "csharp", path: "csharp/basics", icon: "csharp.svg", color: "#5D3FD3" },
        { name: "Docker", directory: "docker", path: "docker/basics", icon: "docker.svg", color: "#00599C" },
        { name: "Express.Js", directory: "express", path: "express/basics", icon: "express.svg", color: "#6cc24a" },
        { name: "Java", directory: "java", path: "java/basics", icon: "java.svg", color: "#D43A02" },
        { name: "JavaScript", directory: "javascript", path: "javascript/basics", icon: "javascript.svg", color: "#FFBF00" },
        { name: "Node.Js", directory: "node", path: "node/basics", icon: "node.svg", color: "#6cc24a" },
        { name: "PHP", directory: "php", path: "php/basics", icon: "php.svg", color: "#5D3FD3" },
        { name: "Python", directory: "python", path: "python/basics", icon: "python.svg", color: "#FFBF00" },
        { name: "React", directory: "react", path: "react/basics", icon: "react.svg", color: "#61DBFB" },
        { name: "SQL", directory: "sql", path: "sql/basics", icon: "sql.svg", color: "#61DBFB" },
        { name: "MongoDB", directory: "mongodb", path: "mongodb/basics", icon: "mongodb.svg", color: "#00684A" },
    ], []);

    // Get the current location to determine the active section
    const regex = /\/([^/]+)\/([^/]+)/;
    const match = location.pathname.match(regex);
    const extractedLocation = match ? match[1] : null;
    const extractedSubject = match ? match[2] : null;

    // Extract the subject name from the URL and format it properly
    const subject = extractedSubject
        ? extractedSubject.charAt(0).toUpperCase() + extractedSubject.slice(1).toLowerCase()
        : "";

    // Set default page title
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.text = "Cheat Sheets";

    let iconPath = null;
    const root = document.querySelector(":root");

    // Find the corresponding technology and update the page title and theme color
    if (extractedLocation) {
        const tech = technologies.find((t) => t.directory === extractedLocation);
        if (tech) {
            titleElement.text = `${tech.name} - ${subject}`;
            root.style.setProperty("--primary", tech.color);
            iconPath = `/assets/${tech.icon}`;
        }
    }

    return (
        <nav>
            <div className="nav-left">
                {/* Show sidebar toggle button only when inside a technology page */}
                {extractedLocation && <Bar />}

                {/* Show technology logo if available, otherwise default logo */}
                <Link to="/">
                    {iconPath ? <img src={iconPath} alt="logo" className="logo" /> : <FaSheetPlastic className="default-logo logo" />}
                </Link>

                {/* Dropdown menu for cheat sheets */}
                <div
                    className="dropdown"
                    onClick={() => setOpen(!open)}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <p className="hover">
                        Cheat Sheets <span className="arrow">{open ? "▲" : "▼"}</span>
                    </p>
                    <div className="dropdown-options">
                        {technologies.map((tech) => (
                            <Link key={tech.name} className="Link" to={tech.path}>
                                {tech.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="nav-right">
                {/* Support button */}
                <a className="support" href="https://ko-fi.com/X8X511TO4J" target="_blank">
                    <PiCoffeeBold style={{ marginRight: 5 }} /> Buy me a coffee
                </a>

                {/* Theme toggle button */}
                <ThemeIcon />
            </div>
        </nav>
    );
}

export default Navbar;
