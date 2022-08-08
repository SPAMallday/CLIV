import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ClassCreate from "../../components/class/create/ClassCreate";
import QnaItem from "../../components/qna/QnaItem";
import ReserveClass from "../../components/class/reserve/ReserveClass";
import CloseClass from "../../components/class/close/CloseClass";

import "./ClassManage.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`classmanage-tabpanel-${index}`}
      className={"classmanage-tabpanel"}
      aria-labelledby={`classmanage-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function ClassManage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    document.getElementById("bodyContainer").style.padding = 0;

    return () => {
      document.getElementById("bodyContainer").style = "";
    };
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        textColor='secondary'
        indicatorColor='secondary'
        sx={{ borderRight: 1, borderColor: "divider", bgcolor: "#f7ecde" }}
      >
        <Tab label='예정 클래스' {...a11yProps(0)} />
        <Tab label='지난 클래스' {...a11yProps(1)} />
        <Tab label='클래스 생성' {...a11yProps(2)} />
        <Tab label='Q & A 관리' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ReserveClass />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CloseClass />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p className='classManageTitle'>클래스 생성</p>

        <ClassCreate />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <p className='classManageTitle'>Q & A 관리</p>

        <Box sx={{ px: 8, pt: 4 }}>
          <QnaItem />
        </Box>
      </TabPanel>
    </Box>
  );
}

export default ClassManage;
