const performOperation = (numbers, operator) => {
    switch(operator) {
        case '/':
            return numbers[0] / numbers[1];
        case 'x':
            return numbers[0] * numbers[1];
        case '-':
            return numbers[0] - numbers[1];
        case '+':
            return numbers[0] + numbers[1];
        default:
            return NaN;
    }
}

const getCheckedFormula = (formula) => {
    const formulaWithSigns = [];
    const checkedFormula = [];

    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === '+') {
            if (formula.length - 1 !== i && formula[i + 1] === '-') {
                formulaWithSigns.push(-parseFloat(formula[i + 2]));
                i += 2; 
                continue;
            }
            formulaWithSigns.push(parseFloat(formula[i + 1]));
            i += 1;
        } else if (formula[i] === '-') {
            formulaWithSigns.push(-parseFloat(formula[i + 1]));
            i += 1;
        } else if (formula[i] === 'x' | formula[i] === '/'){
            formulaWithSigns.push(formula[i]);
        } else {
            formulaWithSigns.push(parseFloat(formula[i]));
        }
    }

    for(let i = 0; i < formulaWithSigns.length; i++) {
        if (formulaWithSigns.length - 2 > i) {
            if (formulaWithSigns[i + 1] === 'x' || formulaWithSigns[i + 1] === '/') {
                checkedFormula.push(performOperation([formulaWithSigns[i], formulaWithSigns[i + 2]], formulaWithSigns[i + 1]));
                i += 2;
            } else {
                checkedFormula.push(formulaWithSigns[i]);
            }
        } else {
            checkedFormula.push(formulaWithSigns[i]);
        }
    }

    return checkedFormula;
}

const calculateResult = (formula) => {
    if (formula.join().indexOf('=') !== -1) {
        const prevCalcResult = formula.join();
        
        return prevCalcResult.slice(prevCalcResult.indexOf('=') + 1, prevCalcResult.length);
    }

    const checkedFormula = getCheckedFormula(formula);
    
    return checkedFormula.reduce((acc, cur) => acc + cur, 0).toString();
}

export { calculateResult };
