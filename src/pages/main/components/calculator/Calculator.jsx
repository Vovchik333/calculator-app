import { CalcButtons, CalcScreen } from "./components/components";
import './Calculator.scss';
import { useState } from "react";

const Calculator = () => {
    const [display, setDisplay] = useState({
        formula: [],
        output: '0'
    });

    const handleClearDisplay = () => {
        setDisplay({
            formula: [],
            output: '0'
        });
    };

    const handleChangeDisplay = ({ formula, output }) => {
        setDisplay(state => {
            const lastIndex = state.formula.length - 1;
            if (lastIndex + 1 === 0) {
                return {
                    output: output,
                    formula: [...state.formula, formula]
                }
            }

            const isPrevOperator = isNaN(parseFloat(state.formula[lastIndex]));
            const isCurOperator = isNaN(parseFloat(formula));
            const isPrevNumber = !isPrevOperator;
            const isCurNumber = !isCurOperator;

            if (isPrevOperator && isCurOperator) {
                if (state.formula[lastIndex] !== '-' && formula === '-') {
                    return {
                        output: output,
                        formula: [...state.formula, formula]
                    }; 
                } 
                if (isNaN(parseFloat(state.formula[lastIndex - 1])) && state.formula[lastIndex] === '-' && formula === '-') {
                    return {
                        output: output,
                        formula: [...state.formula.slice(0, lastIndex), formula]
                    }; 
                } 
                if (isNaN(parseFloat(state.formula[lastIndex - 1])) && state.formula[lastIndex] === '-' && formula !== '-') {
                    return {
                        output: output,
                        formula: [...state.formula.slice(0, lastIndex - 1), formula]
                    }; 
                }
            };

            if ((isPrevOperator !== isCurOperator) || (isPrevNumber !== isCurNumber)) {
                return {
                    output: output,
                    formula: [...state.formula, formula]
                };
            } 
            if ((isPrevOperator === isCurOperator) || (isPrevNumber === isCurNumber)) {
                return {
                    output: output,
                    formula: [...state.formula.slice(0, lastIndex), formula]
                };
            }
        });
    };

    return (
        <div className="calculator">
            <CalcScreen display={display}/>
            <CalcButtons 
                formula={display.formula}
                onClearDisplay={handleClearDisplay}
                onChangeDisplay={handleChangeDisplay}
            />
        </div>
    )
}

export { Calculator };
