//don't forget to add property number if it is necessary while using vamidatorsErrorMessages
const validatorsErrorMessages = {
  MIN_LENGTH:
    'La taille de votre $property $value est courte, la taille minimale de $property est $constraint',
  MAX_LENGTH:
    'La taille de votre $property $value est longue, la taille minimale de $property est $constraint',
  REQUIRED: 'la propriétée $property est obligatoire',
  IS_Enum: 'la propriété $propert doit etre $constrainte',
};
export default validatorsErrorMessages;
