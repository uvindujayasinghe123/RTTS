import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect, useRef } from "react";

import { checkValidity, updateObject } from "../../../shared/utility";
import { register, forgotPassword } from "../../../api/authAPI";
import Input from "../../Input";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	switchAuthWrapper: {
		padding: "10px 0",
	},
}));

const inputConfigs = {
	email: {
		elementType: "input",
		propsToPass: {
			type: "email",
			autoComplete: "email",
			variant: "outlined",
			size: "small",
			margin: "normal",
			required: true,
			fullWidth: true,
			id: "email",
			label: "Email Address",
			name: "email",
			autoFocus: false,
			error: false,
		},
		validation: {
			required: true,
			isEmail: true,
		},
	},
};

const ForgotPasswordForm = (props) => {
	const classes = useStyles();

	const { search } = useLocation();

	const {
		isAuthenticated
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const history = useHistory()
	const [state, setState] = useState({
		controls: {
			email: {
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
				const response = await forgotPassword(state.controls.email.value);
				alert("Email sent")
				if (response.data) {
					history.push('/login')
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
			Send email
		</Button>
	);

	const switchAuth = (
		<div className={classes.switchAuthWrapper}>
			<p>
				Suddenly remembered the password? <a href={'/login'}>Log in</a>
			</p>
		</div>
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
			<p>Please check your email inbox after a successful submission</p>
			{submitButton}
			{switchAuth}
		</React.Fragment>
	);
};

export default ForgotPasswordForm;
