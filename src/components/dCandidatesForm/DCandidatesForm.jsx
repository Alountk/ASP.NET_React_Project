import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as A from "../../pages/candidates/store/candidates.action";
import useForm from "../../custom/hooks/useForm";
import { useToasts } from "react-toast-notifications";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": { 
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCandidatesForm = ({ classes, ...props }) => {
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        const onSuccess = () => {
          resetForm();
          addToast("Submitted successfully", { appearance: 'success' });
        }
        if(props.currentId === 0){
          dispatch(A.createCandidateRequest(values));
          onSuccess();
        }else{
          let payload = {
            id:props.currentId,
            ...values
          }
          dispatch(A.updateCandidateRequest(payload))
          onSuccess();
        }
      }
    };

  // validate()
  // validate({fullName: 'Laura'})
  const validate = (fieldValues = values) => {
    let temp = {};
    if ("fullName" in fieldValues) {
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    }
    if ("mobile" in fieldValues) {
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    }
    if ("bloodGroup" in fieldValues) {
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
    }
    if ("email" in fieldValues) {
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFieldValues,
    validate,
    props.setCurrentId
  );

  useEffect(() => {
    if(props.currentId !== 0){
      let newValues=props.candidatesList.find(x => x.id === props.currentId);
      setValues(
        newValues
      )}
      setErrors({})
      // eslint-disable-next-line
  }, [props.currentId])


  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = React.useRef(null);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);



  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="O+">O +ve</MenuItem>
              <MenuItem value="O-">O -ve</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            type="number" 
            inputProps={{ min: "0", max: "100" }}
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button variant="contained" className={classes.smMargin} onClick={resetForm}>
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(DCandidatesForm);
