// определение кастомных типов данных.
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor, // тип - только определенные значения.
) {
    let result;
    
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }

    switch(resultConversion) {
        case 'as-number':
            return +result;
        case 'as-text':
            return result.toString();
    }
}

const combinedAges = combine(30, 26, 'as-number');

console.log(combinedAges);

const combinedNames = combine('Max', 'Anna', 'as-text');