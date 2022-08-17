import MatchingRequest from "../../components/matching/MatchingRequest";
import MyPreRequest from "../../components/matching/MyPreRequest";

import Box from "@mui/material/Box";

import "./Matching.css";

function Matching() {
  return (
    <Box sx={{ mt: 3 }}>
      <MatchingRequest />
      <MyPreRequest />
    </Box>
  );
}

export default Matching;
