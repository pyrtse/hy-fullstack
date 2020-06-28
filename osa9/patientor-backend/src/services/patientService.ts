import {Patient, PublicPatient, NewPatient, Entry} from '../types';
import patients from '../../data/patients';



const publicPatients: PublicPatient[] = patients as PublicPatient[];

const getPatient = (id: string) :  Patient | undefined => {
  console.log(patients);
  return patients.find(p => p.id ===id);
};

const getPatients = (): Patient[] => { 
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return publicPatients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: 'x',
    ...entry
  };

  patients.push(newPatient);
  console.log(patients);
  return newPatient;
};

const addEntry = (id: string, entry: Entry): Entry => {
  patients.find(p => p.id = id)?.entries.push(entry);
  return entry;
};

export default {
  getPublicPatients,
  getPatients,
  addPatient,
  getPatient,
  addEntry
};