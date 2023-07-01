import { Grid, Typography } from "@mui/material";

export const Header = () => {
  return (
    <div style={{ backgroundColor: "rgb(230, 230, 230)" }}>
      <Grid container spacing={1} direction={"row"} columns={15}>
        <Grid item xs={5} md={5} sx={{ mt: 2.5 }} justifyContent={"flex-start"}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://scotiabankfiles.azureedge.net/scotiabank-chile/brand-guideline/logos-scotiabank/scotia-red.svg"
              alt="alt"
            />
          </div>
        </Grid>
        <Grid item xs={4} md={6} justifyContent={"center"}>
          <Typography component="div">
            <h1>Codeo por navegao</h1>
          </Typography>
          <Grid item xs={1} md={10}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};
