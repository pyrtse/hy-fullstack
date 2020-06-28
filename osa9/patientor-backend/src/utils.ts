import {Gender, NewPatient, Entry, HospitalEntry, Discharge, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry, SickLeave} from './types'; 

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const toNewPatientEntry = (object: any): NewPatient => {
  const newPatient: NewPatient = { 
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  return newPatient;
};

const parseName = (name: any): string =>{ 
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name '); 
  }
  return name;
};

const  parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing name ');
  }

  return dateOfBirth;
};

const parseSsn = (ssn: any) : string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing Gender');
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const toNewEntry = (object: any) : Entry => {
  switch(object.type){
    case "Hospital":
      return parseHospitalEntry(object);
    case "HealthCheck":
      return parseHealthCheckEntry(object);
    default: 
      throw new Error('Invalid entry'); 
  }
};

const parseHospitalEntry = (object: any) : HospitalEntry => {
  const hospitalEntry: HospitalEntry = {
    type: "Hospital",
    id:'x',
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge)
  };
  return hospitalEntry;
};

const parseHealthCheckEntry = (object: any) : HealthCheckEntry => {
  const healthCheckEntry: HealthCheckEntry = {
    type: "HealthCheck",
    id:'x',
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)    
  };
  return healthCheckEntry;
};

const parseOccupationalHealthcareEntry = (object: any) : OccupationalHealthcareEntry => {
  const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
    type: "OccupationalHealthcare",
    id:'x',
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName)     
  };
  if (object.sickLeave) {
    occupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave);
  }
  return occupationalHealthcareEntry;
};

const parseSickLeave = (object: any): SickLeave => {
  const sickLeave: SickLeave = {
    startDate: parseStartDate(object.startDate),
    endDate: parseEndDate(object.endDate)
  };
  return sickLeave;
};

const parseStartDate = (startDate: any): string => {
  if (!startDate || !isString(startDate) || isDate(startDate)) {
    throw new Error('Incorrect or missing start date');
  } else {
    return startDate;
  }
};

const parseEndDate = (endDate: any): string => {
  if (!endDate || !isString(endDate) || isDate(endDate)) {
    throw new Error('Incorrect or missing end date');
  } else {
    return endDate;
  }
};




const parseEmployerName= (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error ('Employer name incorrect or missing');
  } else {
    return employerName;
  }
};

const parseHealthCheckRating= (rating: any): HealthCheckRating => {
  console.log(rating);
  if(!rating || !isHealthCheckRating(rating)) {
    throw new Error('Health Check rating incorrect or missing');
  } else {
    return rating;
  }
};

const parseDischarge = (object: any) : Discharge => {
  if (!object) {
    throw new Error('Discharge missing');
  } else {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria)
    };
    return discharge;
  }
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Critera incorrect or missing');
  } else {
    return criteria;
  }
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('description incorrect or missing');
  } else {
    return description;
  }
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)){
    throw new Error('Date incorrect or missing');
  } else {
    return date;
  }
};

const parseSpecialist = (specialist: any): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Specialist incorrect or missing');
  } else {
    return specialist;
  }
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  console.log(Object.values(HealthCheckRating));
  return Object.values(HealthCheckRating).includes(Number(param));
};


const parseDiagnosisCodes =  (diagnosisCodes: any): string[] => {
  if (!diagnosisCodes) {
    return [];
  }else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
  }
};