import { Button } from "../../../../../../components/components";
import { 
    DigitButtons, 
    OperatorButtons 
} from "./components/components";
import { 
    useState, 
    useRef 
} from "react";
import './CalcButtons.scss';

const CalcButtons = ({
    formula,
    onClearDisplay,
    onChangeDisplay
}) => {
    const [calculatedFormula, setCalculatedFormula] = useState(null);
    const numberRef = useRef('');
    const operatorRef = useRef('');

    const handleSetCalculatedFormula = (formula) => {
        setCalculatedFormula(formula);
    }

    const handleChangeNumber = (event) => {
        if (operatorRef.current !== '') {
            operatorRef.current = '';
        }
        if (calculatedFormula !== null) {
            onClearDisplay();
            setCalculatedFormula(null);
            numberRef.current = '';
        }

        const value = event.target.value;
        const { current: num } = numberRef;

        if (num.indexOf('.') !== -1) {
            if (value === '.') {
                return;
            } else {
                numberRef.current += value;
            }
        } else if (num[0] === '0' && value === '0') {
            return;
        } else if (num[0] === '0' && value !== '0' && value !== '.') {
            numberRef.current = value;
        } else {
            if (value === '.' && num.length === 0) {
                numberRef.current += '0' + value;
            } else {
                numberRef.current += value;
            }
        }

        onChangeDisplay({ formula: numberRef.current, output: numberRef.current });
    }

    const handleChangeOperator = (event) => {
        if (numberRef.current !== '') {
            numberRef.current = '';
        }
        if (calculatedFormula !== null) {
            onClearDisplay();
            onChangeDisplay({ formula: calculatedFormula, output: calculatedFormula });
            setCalculatedFormula(null);
            operatorRef.current = '';
        }

        const { value } = event.target;

        operatorRef.current = value;
        onChangeDisplay({ formula: value, output: value });
    };

    const handleClearDisplay = () => {
        numberRef.current = '';
        operatorRef.current = '';
        setCalculatedFormula(null);
        onClearDisplay();
    };

    return (
        <section className="calc-buttons">
            <div className="calc-buttons__clear-and-digits">
                <Button 
                    id='clear'
                    className='button calc-buttons__clear'
                    onClick={handleClearDisplay}
                >AC</Button>
                <DigitButtons 
                    onChangeDisplay={onChangeDisplay}
                    onSetNumber={handleChangeNumber}
                />
            </div>
            <OperatorButtons 
                formula={formula}
                onChangeDisplay={onChangeDisplay}
                onSetOperator={handleChangeOperator}
                onCalculateFormula={handleSetCalculatedFormula}
            />
        </section>
    );
};

export { CalcButtons };
