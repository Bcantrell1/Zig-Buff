import React, { useState } from "react";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import TabPanel from "../../hooks/tabPanel";

function Dashboard(props) {
    const [value, setValue] = useState(0);
    const accountId = parseInt(
        BigInt(props.steamId) - BigInt(76561197960265728)
    );

    const setTabInfo = (index) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    };

    const tabChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <PlayerInfo logOut={props.logOut} accountId={accountId} />
            {/* Tabs */}
            <div>
                {/* Tab */}
                <button onClick={() => tabChange(null, 0)}>Tab 1</button>
                <button onClick={() => tabChange(null, 1)}>Tab 2</button>
                <button onClick={() => tabChange(null, 2)}>Tab 3</button>
            </div>
            <TabPanel value={value} index={0}>
                Tab 1
            </TabPanel>
            <TabPanel value={value} index={1}>
                Tab 2
            </TabPanel>
            <TabPanel value={value} index={2}>
                Tab 3
            </TabPanel>
        </div>
    );
}

export default Dashboard;
