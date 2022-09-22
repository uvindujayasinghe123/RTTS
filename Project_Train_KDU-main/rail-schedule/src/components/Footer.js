import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: "20px",
    paddingBottom: "20px",
    //used to make the footer sticky
    flexShrink: "0",
  },
  divider: {
    marginTop: "20px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Divider className={classes.divider} variant="fullWidth" />
      <footer className={classes.footer}>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          component="h1"
        >
          {"All rights "}
          <Link color="inherit" href="https://zeroonetech.xyz/">
            Reserved
          </Link>
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            Contact us via:
            <IconButton
              aria-label="facebook"
              onClick={() => window.open("https://www.facebook.com")}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="instagram"
              onClick={() => window.open("https://www.instagram.com")}
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
