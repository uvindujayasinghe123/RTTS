import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect, useRef } from "react";

import { checkValidity, updateObject } from "../../../shared/utility";
import { register, resetPassword } from "../../../api/authAPI";
import Input from "../../Input";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	switchAuthWrapper: {
		padding: "10px 0",
	},
}));

const inputConfigs = {
	password: {
		elementType: "input",
		propsToPass: {
			type: "password",
			autoComplete: "current-password",
			variant: "outlined",
			size: "small",
			margin: "normal",
			required: true,
			fullWidth: true,
			id: "password",
			label: "Password",
			name: "password",
			error: false,
		},
		validation: {
			required: true,
			minLength: 6,
			maxLength: 40,
		},
	},
	confirmPassword: {
		elementType: "input",
		propsToPass: {
			type: "password",
			variant: "outlined",
			size: "small",
			margin: "normal",
			required: true,
			fullWidth: true,
			id: "c-password",
			label: "Confirm Password",
			name: "c-password",
			error: false,
		},
		validation: {
			required: true,
			minLength: 6,
			maxLength: 40,
		},
	},
};

const PasswordResetForm = (props) => {
	const classes = useStyles();

	const { search } = useLocation();
	const redirectUrl = search.substring(6);
	const [error, setError] = useState(null);
	const history = useHistory();

	const {
		isAuthenticated,
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		controls: {
			password: {
				value: "",
				valid: false,
				touched: false,
			},
			confirmPassword: {
				value: "",
				valid: false,
				touched: false,
			},
		},
	});

	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => (isMounted.current = false);
	}, []);

	const inputChangeHandler = (event, controlName) => {
		const controlElementConfig = inputConfigs[controlName];
		const isValid = checkValidity(
			controlElementConfig.validation,
			event.target ? event.target.value : event
		);
		const updatedControls = updateObject(state.controls, {
			[controlName]: {
				value: event.target ? event.target.value : event,
				valid: isValid,
				touched: true,
			},
		});
		controlElementConfig.propsToPass.error = !isValid;

		setState({
			controls: updatedControls,
		});
	};

	let authRedirect = null;
	if (isAuthenticated) {
		authRedirect = <Redirect to={"/"} />;
	}

	const formElementArray = [];
	for (let key in state.controls) {
		formElementArray.push({
			id: key,
			config: inputConfigs[key],
			controls: state.controls[key],
		});
	}

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		let updatedFormControls = {};

		for (let formControlKey in state.controls) {
			let isValid = state.controls[formControlKey].valid;
			if (
				!state.controls[formControlKey].valid &&
				!state.controls[formControlKey].value &&
				!inputConfigs[formControlKey].validation.required
			) {
				isValid = true;
			}
			let updatedControl = updateObject(state.controls[formControlKey], {
				touched: true,
				valid: isValid,
			});
			updatedFormControls = updateObject(updatedFormControls, {
				[formControlKey]: updatedControl,
			});
		}
		setState({
			controls: updatedFormControls,
		});

		const invalid = Object.values(updatedFormControls).find(
			(control) => control.valid === false
		);

		if (!invalid) {
			// onAuthStart();
			try {
				const response = await resetPassword(props.email, {
					password: state.controls.password.value,
				});
				if (!response.error) {
					history.push("/login");
				} else {
					setError("Error occured. Please make sure the email address is correct.")
				}
			} catch (error) {
				setError("Please try again");
			} finally {
				if (isMounted.current) setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	};

	let submitButton = (
		<Button
			variant="contained"
			color="primary"
			onClick={onSubmitHandler}
			disabled={isLoading}
		>
			Submit
		</Button>
	);

	return (
		<React.Fragment>
			{authRedirect}
			{formElementArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						propsToPass={formElement.config.propsToPass}
						value={formElement.controls.value}
						values={
							formElement.config.values
								? formElement.config.values
								: null
						}
						changed={(event) =>
							inputChangeHandler(event, formElement.id)
						}
						invalid={!formElement.controls.valid}
						touched={formElement.controls.touched}
						valueType={formElement.id}
					/>
				);
			})}
			<Typography color="error" variant="subtitle2">
				{error ? error : ""}
			</Typography>
			<p>
				You should use this password here onwards as the login to
				Childishthings.lk
			</p>
			{submitButton}
		</React.Fragment>
	);
};

export default PasswordResetForm;
