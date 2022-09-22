import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import AuthBanner from "./AuthPage/Banner";
import ForgotPasswordForm from "./AuthPage/ForgotPasswordForm";
import { useParams, useLocation } from "react-router-dom";
import PasswordResetForm from "./AuthPage/PasswordResetForm";

const useStyles = makeStyles((theme) => ({
	root: { 
		flexGrow: 1,
		height: "80vh",
	},
	banner: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			width: "100%",
			display: "block",
		},
	},
	formWrapper: {
		textAlign: "center",
		padding: "4px 20px",
		[theme.breakpoints.up("sm")]: {
			padding: "4px 40px",
		},
	},
}));

const PasswordResetPage = ({
	isAuthenticated
}) => {
	const classes = useStyles();

	const {email} = useParams();
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);

	return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{ height: "100%" }}
      >
        <Grid className={classes.banner} item md={7}>
          <AuthBanner />
        </Grid>
        <Grid item xs={12} md={5}>
          {!searchParams.get("email") ? (
            <div className={classes.formWrapper}>
              <h1>Forgot password?</h1>
              <h3>
                We'll send you an email with a magic link to reset the
                password...
              </h3>
              <ForgotPasswordForm isAuthenticated={isAuthenticated} />
            </div>
          ) : (
            <div className={classes.formWrapper}>
              <h1>New password</h1>
              <h3>Enter a strong and easy to remeber password</h3>
              <PasswordResetForm
                isAuthenticated={isAuthenticated}
                email={searchParams.get("email")}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token != null,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onAuth: (data) => dispatch(userAuthenticated(data)),
// 		onAuthStart: () => dispatch(authStart()),
// 		onAuthFailed: () => dispatch(onAuthFailed()),
// 	};
// };

export default connect(mapStateToProps)(PasswordResetPage);
