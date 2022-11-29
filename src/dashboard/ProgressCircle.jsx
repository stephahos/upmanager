import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress, size = "60" }) => {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
