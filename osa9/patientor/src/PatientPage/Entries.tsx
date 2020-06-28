import React from 'react';
import {Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from '../types';
import { Container, Icon, Card } from "semantic-ui-react";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthIcon: React.FC<{status: any}> = ({status}) => {
  console.log(status);
  if(status===0) {
    return <Icon name='heart' color='red'/>;
  } else if (status < 4) {
    return <Icon name='heart' color='yellow'/>;
  } else {
    return <Icon name='heart' color='black'/>;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Diagnoses: React.FC<{diagnoseList: string[] | undefined}> = ({diagnoseList}) => {
  const [{diagnoses}] = useStateValue();
  if (diagnoseList) {
    return (
      <ul>
        {diagnoseList.map((diagnosis: string)=> (
          <li key={diagnosis}>{diagnosis} {Object.values(diagnoses).find(d => d.code===diagnosis)?.name}</li>
        ))}
      </ul>
    );
  } else {
    return null;
  }

};  

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return(
    <div>
      <Card padded fluid style={{'margin-bottom': '20px'}}>
        <h3>{entry.date} <Icon name='hospital'/></h3>
        <p>{entry.description}</p>
      </Card>
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  return(
    <div>
      <Card padded ui fluid style={{'margin-bottom': '20px'}}>
        <h3>{entry.date} <Icon name='user md'/></h3>
        <p>{entry.description}</p>
        <HealthIcon status={entry.healthCheckRating}/>
      </Card>
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return(
    <div>
      <Card padded fluid style={{'margin-bottom': '20px'}}>
        <h3>{entry.date} <Icon name='user md'/> {entry.employerName}</h3>
        <p>{entry.description}</p>
      </Card>
    </div>
  );
};


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) =>{
  switch(entry.type){
    case "Hospital":
      return <HospitalEntryDetails entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const Entries: React.FC<{entries: Entry[]}> = ({entries}) => {
  return(
    <div>
      <Container>
        <h2>entries</h2>
        {entries.map((entry: Entry,) => (
          <EntryDetails key={entry.id} entry={entry}/>
        ))}
      </Container>
    </div>
  );
};

export default Entries;