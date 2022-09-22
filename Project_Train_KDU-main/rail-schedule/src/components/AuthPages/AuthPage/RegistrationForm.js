import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect, useRef } from "react";

import { checkValidity, updateObject } from "../../../shared/utility";
import { register } from "../../../api/authAPI";
import Input from "../../Input";

const useStyles = makeStyles((theme) => ({
  switchAuthWrapper: {
    padding: "10px 0",
  },
}));

const inputConfigs = {
  firstName: {
    elementType: "input",
    propsToPass: {
      type: "text",
      autoComplete: "given-name",
      variant: "outlined",
      size: "small",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "firstName",
      label: "First Name",
      name: "firstName",
      error: false,
    },
    validation: {
      required: true,
      minLength: 3,
      maxLength: 60,
    },
  },
  lastName: {
    elementType: "input",
    propsToPass: {
      type: "text",
      autoComplete: "family-name",
      variant: "outlined",
      size: "small",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      error: false,
    },
    validation: {
      required: true,
      minLength: 3,
      maxLength: 60,
    },
  },
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
  // contact: {
  // 	elementType: "input",
  // 	propsToPass: {
  // 		type: "tel",
  // 		autoComplete: "tel",
  // 		variant: "outlined",
  // 		size: "small",
  // 		margin: "normal",
  // 		required: true,
  // 		fullWidth: true,
  // 		id: "contact",
  // 		label: "Mobile Number",
  // 		name: "contact",
  // 		autoFocus: false,
  // 		error: false,
  // 	},
  // 	validation: {
  // 		required: true,
  // 		minLength: 10,
  // 		maxLength: 10,
  // 	},
  // },
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

const RegistrationForm = (props) => {
  const classes = useStyles();

  const { search } = useLocation();
  const redirectUrl = search.substring(6);

  const {
    isAuthenticated,
    authRedirectPath,
    onAuth,
    onAuthStart,
    onAuthFailed,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    controls: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
      },
      lastName: {
        value: "",
        valid: false,
        touched: false,
      },
      email: {
        value: "",
        valid: false,
        touched: false,
      },
      // contact: {
      // 	value: "",
      // 	valid: false,
      // 	touched: false,
      // },
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
    if (redirectUrl) {
      authRedirect = <Redirect to={redirectUrl} />;
    } else {
      authRedirect = <Redirect to={authRedirectPath} />;
    }
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
        const response = await register({
          email: state.controls.email.value,
          password: state.controls.password.value,
          firstName: state.controls.firstName.value,
          lastName: state.controls.lastName.value,
        });

        console.log(response);

        if (response.data.data !== null) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/login";
        } else {
          alert("Invalid information");
        }
      } catch (error) {
        onAuthFailed("");
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
      Register
    </Button>
  );

  const switchAuth = (
    <div className={classes.switchAuthWrapper}>
      <p>
        Already have an account? <a href={"/login"}>Log in</a>
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
              formElement.config.values ? formElement.config.values : null
            }
            changed={(event) => inputChangeHandler(event, formElement.id)}
            invalid={!formElement.controls.valid}
            touched={formElement.controls.touched}
            valueType={formElement.id}
          />
        );
      })}
      <p>
        By clicking Create account, you agree to Shutterfly's{" "}
        <a href="/">Terms of Use</a> and <a href="/">Privacy Policy</a>. In
        Addition you will be subscribed to receive exclusive email offers.
      </p>
      {submitButton}
      {switchAuth}
    </React.Fragment>
  );
};

export default RegistrationForm;
