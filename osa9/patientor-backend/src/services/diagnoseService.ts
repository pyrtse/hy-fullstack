import diagnosisData from '../../data/diagnoses.json';

import {Diagnosis} from '../types';

const diagnoses: Diagnosis[]= diagnosisData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};

