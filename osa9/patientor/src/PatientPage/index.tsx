import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import {
  useParams
} from "react-router-dom";
import { apiBaseUrl } from "../constants";
import {Patient, Entry} from '../types';
import {setPatient, addEntry} from '../state/reducer';
import Entries from './Entries';
import AddEntryModal from "./AddEntryModal";
import {EntryFormValues} from './AddEntryForm'; 

const GenderIcon: React.FC<{gender: string}> = ({gender}) => {
  switch(gender){
    case "male":
      return <Icon name="mars"/>;
    case "female":
      return <Icon name="venus"/>;
    case "other":
      return <Icon name="genderless"/>;
    default:
      return null;
  }
};

const PatientPage: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const fetchPatient = async () => {
    try {
      const { data: patient} = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatient(patient));
    } catch (e) {
      console.error(e);
    }
  };
  if (!state.patient || state.patient.id !== id) {
    fetchPatient();
  }
  console.log(state);
  if(!state.patient) {
    return <Icon loading name="spinner"></Icon>;
  }

  const submitNewEntry = async (values: EntryFormValues)=> {
    try {
      const {data: newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${state.patient?.id}/entries`
        ,values
      );
      console.log(newEntry);
      const newPatient = state.patient;
      newPatient?.entries.push(newEntry);
      if (newPatient){
        dispatch(addEntry(newPatient));
      }
      closeModal(); 
    } catch(e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Container >
        <h1>{state.patient.name} <GenderIcon gender={state.patient.gender}/></h1>
      </Container>
      <br/>
      <Container >
        <p>ssn: {state.patient.ssn}</p>
        <p>occupation: {state.patient.occupation}</p>
      </Container>
      <Entries entries={state.patient.entries}/>
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;