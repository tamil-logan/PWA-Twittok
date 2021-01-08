import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import auth from "./auth-helper";
import Newsfeed from "./../post/Newsfeed";


const theme = createMuiTheme({
  typography: {
    htmlFontSize: 8,
    fontFamily: ["lato"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    }
  },
}));

export function Home({ history }) {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className={classes.root}>
      {!defaultPage && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Card
              className={classes.card}
              style={{
                backgroundColor: "transparent",
                color: "white",
                boxShadow: "none",
              }}
            >
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Open the new creative world.
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  It's all here.
                </Typography>
              </ThemeProvider>
            </Card>
          </Grid>
        </Grid>
      )}
      {defaultPage && (
        <div>

          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Newsfeed />
            </Grid>
           
          </Grid>
        </div>
      )}
    </div>
  );
}
