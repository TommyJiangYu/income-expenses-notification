import { Typography, Paper, Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, height: 140 }}>
            <Typography variant="h6">Widget 1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, height: 140 }}>
            <Typography variant="h6">Widget 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, height: 140 }}>
            <Typography variant="h6">Widget 3</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
