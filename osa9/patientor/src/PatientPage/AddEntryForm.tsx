import React from 'react';
import { Field, Formik, Form } from "formik";
import {DiagnosisSelection, TextField} from '../AddPatientModal/FormField';
import { useStateValue } from "../state";
import {HealthCheckRating, HealthCheckEntry} from '../types';
import {SelectField} from './FormField';
import { Grid, Button } from "semantic-ui-react";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

export type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

const healthRatingOptions: HealthRatingOption[] = [
  {value: HealthCheckRating.Healthy, label:"Healthy"},
  {value: HealthCheckRating.LowRisk, label: "Low Risk"},
  {value: HealthCheckRating.HighRisk, label: "High Risk"},
  {value: HealthCheckRating.CriticalRisk, label: "Critical Risk"}
];

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: HealthRatingOption[];
};

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}


const AddEntryForm: React.FC<Props> = ({onCancel, onSubmit}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: 'HealthCheck',
      description: '',
      specialist: '',
      diagnosisCodes:[],
      date: '',
      healthCheckRating: HealthCheckRating.Healthy
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if(!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          // ...
          <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField
              label="Health Check Rating"
              name= "healthCheckRating"
              options= {healthRatingOptions}
            />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>    
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;