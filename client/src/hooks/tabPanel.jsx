import React from "react";

const TabPanel = ({ children, value, index }) => {
    return (
        <div
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
};

export default TabPanel;
