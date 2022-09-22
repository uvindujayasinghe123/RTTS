import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import AuthBanner from "./AuthPage/Banner";
import RegistrationForm from "./AuthPage/RegistrationForm";

import {
	authStart,
	userAuthenticated,
	onAuthFailed,
} from "../../store/actions/index";

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

const RegisterPage = ({
	isAuthenticated,
	authRedirectPath,
	onAuth,
	onAuthStart,
	onAuthFailed,
}) => {
	const classes = useStyles();

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
					<div className={classes.formWrapper}>
						<h3>Travel with style</h3>
						<h1>Create Account</h1>
						<RegistrationForm
							isAuthenticated={isAuthenticated}
							authRedirectPath={authRedirectPath}
							onAuth={onAuth}
							onAuthStart={onAuthStart}
							onAuthFailed={onAuthFailed}
						/>
					</div>
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

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (data) => dispatch(userAuthenticated(data)),
		onAuthStart: () => dispatch(authStart()),
		onAuthFailed: () => dispatch(onAuthFailed()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
