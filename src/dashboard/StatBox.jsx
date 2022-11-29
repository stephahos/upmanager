import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress }) => {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        gap="20px"
      >
        <Box>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: colors.greenAccent[500],
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px"></Box>
    </Box>
  );
};

export default StatBox;
