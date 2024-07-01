// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
// Function checks via Luhn algorithm if credit cards numbers are valid.
function validateCred(array) {
  // Begins by reversing the array so we can more easily iterate through the array (don't have to iterate backwards) while still using Luhn algorithm (i.e., starting from the farthest digit to the right, AKA the check digit, iterate to the left) When we reverse that, we begin with the first indexed number. If we do this, we can also set if...else so that even numbers are left as is and the odd numbers will execute in the iterator after next.
  let reverseArray = array.reverse();
  // As you iterate to the right (since we've reversed), every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.
  let newArray = [];
  for (let i = 1; i < reverseArray.length; i += 2) {
    if (reverseArray[i] * 2 < 9) {
      newArray.push(reverseArray[i] * 2);
    } else if (reverseArray[i] * 2 >= 9) {
        newArray.push((reverseArray[i] * 2) - 9);
    }
  }
  // Now add the leftover numbers from the reversed array to the new array.
  for (let i = 0; i < reverseArray.length; i += 2) {
    newArray.push(reverseArray[i]);
  }
  // Sum up all the digits in the credit card number.
  let sum = newArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  // If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// Keep track of all invalid credit card numbers.
function findInvalidCards(nestedArray) {
  let findTheFoes = nestedArray.filter(array => validateCred(array) === false);
  return findTheFoes;
}

// Array of all invalid credit card numbers.
let allInvalidCards = findInvalidCards(batch);

// Find companies that have mailed out cards with invalid numbers.
let idInvalidCardCompanies = nestedArray => {
  let companyList = [];
  for (let i = 0; i < nestedArray.length; i++) {
    if (nestedArray[i][0] === 3) {
      companyList.push('Amex (American Express)');
    } else if (nestedArray[i][0] === 4) {
      companyList.push('Visa');
      } else if (nestedArray[i][0] === 5) {
      companyList.push('Mastercard');
      } else if (nestedArray[i][0] === 6) {
      companyList.push('Discover'); 
      } else {
      companyList.push('Company not found');
      }
  }
  return companyList;
}

// Assign compaies to an array.
let allCompanies = idInvalidCardCompanies(allInvalidCards);

// Ensure no duplicates of company names appear by pushing the company names to the new array if they're not already included. So, if Visa's first instane is logged, the second will not.
function reduceCompanyList(array) {
  let reducedCompanyList = [];
  array.forEach(company => {
    if (!reducedCompanyList.includes(company)) {
      reducedCompanyList.push(company);
    }
  });
  return reducedCompanyList;
}

console.log(reduceCompanyList(allCompanies));
  
