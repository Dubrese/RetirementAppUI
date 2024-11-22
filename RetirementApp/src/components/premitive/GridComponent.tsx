import React from "react";
import { Grid } from "@mui/material";

interface GridComponentProps {
  children: React.ReactNode;
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  spacing?: number;
}

const GridComponent: React.FC<GridComponentProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  spacing = 3,
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} spacing={spacing}>
      {children}
    </Grid>
  );
};

export default GridComponent;
