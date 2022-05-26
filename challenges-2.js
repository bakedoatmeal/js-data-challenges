// ================================================================

// Titanic Dataset challenges! 

// Your goal is to write some functions that will extract
// relevant data from the dataset. 

// Write your code here in this file. 

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant 
// piece of information from the data and return it. 

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of 
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
	return data.map((passenger) => passenger.fields[property])
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an 
// array of all the male passengers [{...}, {...}, {...}, ...]

const filterByProperty = (data, property, value) => {
	return data.filter((passenger) => passenger.fields[property] === value)
}

// 3 -------------------------------------------------------------
// Filter out missing or null values
// Return an array where the objects that have undefined for a 
// given property have been removed

const filterNullForProperty = (data, property) => {
	return data.filter((passenger) => property in passenger.fields)
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum 
// for any (numeric) property
// Return the total of all values for a given property. This

const sumAllProperty = (data, property) => {
	const passengers = data.filter((passenger) => property in passenger.fields)
	const sum = passengers.reduce((prev, curr) => prev + curr.fields[property], 0)
	return sum
}


// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an 
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C, 
// and Q, and a couple passengers have undefined for this property. 
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked 
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined

const countAllProperty = (data, property) => {
	const hist = {}
	const passengers = data.filter((passenger) => property in passenger.fields)
	if (data.length - passengers.length > 0) {
		hist.undefined = data.length - passengers.length
	}
	for (const passenger of passengers) {
		if (passenger.fields[property] in hist) {
			hist[passenger.fields[property]] += 1
		} else {
			hist[passenger.fields[property]] = 1
		}
	}
	return hist
}


// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values 
// of a properties divided into buckets and counting the number
// of items in each bucket.

const makeHistogram = (data, property, step) => {
	const passengers = data.filter((passenger) => property in passenger.fields)
	const array = passengers.reduce((prev, passenger) => {
		if (prev[Math.floor(passenger.fields[property] / step)] === undefined) {
			prev[Math.floor(passenger.fields[property] / step)] = 1
			// console.log(prev[Math.floor(passenger.fields[property] / step)])
		} else {
			prev[Math.floor(passenger.fields[property] / step)] += 1
		}
		return prev
	}, [])
	for (let i = 0; i < array.length; i ++ ) {
		if (array[i] === undefined) {
			array[i] = 0
		}
	}
	return array
}

// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an 
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

const normalizeProperty = (data, property) => {
	 let max = 0
	 const passengers = data.filter((passenger) => property in passenger.fields)
	 const values = passengers.map((passenger) => {
		 if (passenger.fields[property] > max) {
			 max = passenger.fields[property]
		 }
		 return passenger.fields[property]
	 })
	 const normalized = values.map((value) => value / max) 
	 return normalized
}

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property. 
// Given the array of data and a property string it should return
// an array of all of the unique values under that property. 
// For example if the property string were "sex" this function 
// would return ['male', 'female']

const getUniqueValues = (data, property) => {
	const values = data.reduce((values, passenger) => {
		if (!values.includes(passenger.fields[property])) {
			values.push(passenger.fields[property])
		} 
		return values
	}, [])
	return values
}

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getAllValuesForProperty,
	filterByProperty,
	filterNullForProperty,
	sumAllProperty,
	countAllProperty,
	makeHistogram,
	normalizeProperty,
	getUniqueValues
}