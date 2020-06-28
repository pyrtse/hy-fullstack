export {};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues{
  value1: number[];
  value2: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let value2;
    if (isNaN(Number(args[args.length -1 ]))) {
      throw new Error('Provided values were not numbers');
    } else {
      value2 = Number(args[args.length -1 ]);
      console.log('vika:', value2);
    }

    const value1: number[] = [];
    args.splice(2, args.length-3).forEach(value => {
      if (isNaN(Number(value))) {
        throw new Error('Provided values were not numbers');
      } else {
        value1.push(Number(value));
        console.log('lisatty: ', value);
      }
    });
    return {value1, value2};
};

const calculateExcercises = (a: number[], b : number) : Result => {
  const periodLength = a.length;
  const trainingDays = a.filter(x => x > 0).length;
  const totalHours = a.reduce((a,b) => a+b);
  const success = totalHours >= (periodLength*b);
  let rating;
  let ratingDescription;
  if(success){
    rating = 3;
    ratingDescription = 'success';
  } else if ((totalHours/(periodLength*b)) > 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'total failure';
  }
  const target = b;
  const average = totalHours/periodLength;
  return {periodLength, trainingDays, success, rating, ratingDescription, target, average};
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExcercises(value1,value2));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateExcercises