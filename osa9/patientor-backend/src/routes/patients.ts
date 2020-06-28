import express from 'express';
import patientService from '../services/patientService';
import {NewPatient} from '../types';
import {toNewPatientEntry, toNewEntry} from '../utils';
import patients from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  console.log('getting patient');
  const patient = patientService.getPatient(req.params.id);
  console.log(patient);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.body);
  const newEntry = toNewEntry(req.body);
  patientService.addEntry(req.params.id, newEntry);
  res.send(newEntry);
});

router.post('/', (req, res) => {
  try {
  const newPatientEntry: NewPatient = toNewPatientEntry(req.body);
  console.log(newPatientEntry);
  const newPatient = patientService.addPatient(newPatientEntry);
  res.json(newPatient).send();
  } catch (error) {
    console.log(error);
    res.json (error).send() ;
  }
});

export default router;