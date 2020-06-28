interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight:number): string => {
  const result = weight/((height/100)*(height/100));
  if (result <15) {
    return 'Very severely underweight';
  }
 if (result <16) {
   return 'Severely underweight';
 }
 if (result < 18.5) {
   return 'Underweight';
 }
 if (result < 25) {
   return 'Normal (healthy weight)';
 }
 if (result < 30) {
   return 'Overweight';
 }
 if (result<35) {
   return 'Obese Class I (Moderately obese)';
 }
 if (result<40) {
   return 'Obese Class II (Severely obese)';
 }
 return 'Obese Class III (Very severely obese)';
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1,value2));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateBmi;