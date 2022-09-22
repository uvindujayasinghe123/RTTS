import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Grid, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	externalLabel: {
		paddingTop: 0,
		[theme.breakpoints.up("md")]: {
			paddingTop: 10,
		},
	},
}));

const Input = (props) => {
	const classes = useStyles();

	const { elementType, propsToPass, value, changed, values, externalLabel } =
		props;
	const { required, label } = propsToPass;

	let inputElement = null;
	let helperText = "";
	if (value && props.invalid && props.touched) {
		switch (props.valueType) {
			case "name":
				helperText = "Use between 3 and 60 characters for your name";
				break;
			case "email":
				helperText = "Enter a valid email";
				break;
			case "address":
				helperText = "Use between 3 and 60 characters for your address";
				break;
			case "district":
				helperText =
					"Use between 3 and 30 characters for your district";
				break;
			case "phone":
				helperText = "Use a valid number";
				break;
			case "password":
				helperText =
					"Use between 6 and 40 characters for your password";
				break;
			case "confirmPassword":
				helperText = "Does not match the password";
				break;
			default:
				helperText = "Invalid Value";
				break;
		}
	}

	if (required && !value && props.touched) {
		helperText = "required";
	}

	let updatedPropsToPass = propsToPass;
	if (externalLabel) updatedPropsToPass = { ...propsToPass, label: "" };

	const defaultInput = (
		<TextField
			{...updatedPropsToPass}
			value={value}
			onChange={changed}
			helperText={helperText}
			error={helperText !== ""}
		/>
	);

	const dropdownInput = values ? (
		<TextField
			{...updatedPropsToPass}
			select
			value={value}
			onChange={changed}
			helperText={helperText}
			error={helperText !== ""}
		>
			{updatedPropsToPass.placeholder && (
				<MenuItem value="" disabled>
					{updatedPropsToPass.placeholder}
				</MenuItem>
			)}
			{values.map((option, i) => (
				<MenuItem key={i} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
	) : (
		""
	);

	switch (elementType) {
		case "input":
			inputElement = defaultInput;
			break;
		case "dropdown":
			inputElement = dropdownInput;
			break;
		default:
			inputElement = defaultInput;
			break;
	}

	return (
		<React.Fragment>
			{externalLabel ? (
				<Grid container spacing={0}>
					<Grid item xs={12} md={3} className={classes.externalLabel}>
						<Typography component="span">{`${label} ${
							required ? "*" : ""
						}`}</Typography>
					</Grid>
					<Grid item xs={12} md={9}>
						{inputElement}
					</Grid>
				</Grid>
			) : (
				<div>{inputElement}</div>
			)}
		</React.Fragment>
	);
};

export default Input;
