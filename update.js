// Validates card numbers
const validateCred = (array) => {
  if (array.length < 13 || array.length > 19) {
    console.log('Invalid card length');
    return false;
  } // Ensure the card length is typical
  let sum = 0;
  let checkDigit = array[array.length - 1]; // Store last digit
  let newArray = array.slice(0, -1); // Copy array without modifying original

  // Process digits (starting from right)
  for (let i = newArray.length - 1; i >= 0; i -= 2) {
    let doubleValue = newArray[i] * 2;
    sum += doubleValue > 9 ? doubleValue - 9 : doubleValue;
  }

  for (let i = newArray.length - 2; i >= 0; i -= 2) {
    sum += newArray[i]; // Sum remaining digits
  }

  sum += checkDigit; // Add the check digit back

  return sum % 10 === 0; // Return true if valid, false otherwise
};

// Finds invalid card numbers
const findInvalidCards = (array) => {
  return array.filter(card => {
    let isValid = validateCred(card);
    console.log(`Card: ${card}, Valid: ${isValid}`); // Filters the nested array to find the valid cards
    return !isValid; // Returns the invalid cards
  });
};

// Finds companies that mailed out invalid card numbers
const idInvalidCardCompanies = (array) => {
  let companies = array.map(a => {
    if (a[0] === 3) {
      return 'Amex (American Express)';
    } else if (a[0] === 4) {
      return 'Visa';
    } else if (a[0] === 5) {
      return 'Mastercard';
    } else if (a[0] === 6) {
      return 'Discover';
    } else {
      console.log('Company not found');
    }
  }); // Creates array of companies that produced indvalid card numbers
  const uniqueArr = new Set(companies); // Turns the array into a set to ensure card company names appear once
  return uniqueArr;
}



