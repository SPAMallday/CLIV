import Box from "@mui/material/Box";
import { Typography, Rating } from "@mui/material";

const labels = {
  1: "기초",
  2: "초급",
  3: "중급",
  4: "고급",
  5: "전문가",
};

function StarRating(props) {
  const rating = props.ratingValue;

  return (
    <Box sx={{ display: "flex" }}>
      <Rating value={rating} readOnly sx={{ ml: 1 }} />
      {rating !== null && (
        <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
          <Typography color={"gray"} fontWeight={600} fontSize={"0.8rem"}>
            {labels[rating]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default StarRating;
