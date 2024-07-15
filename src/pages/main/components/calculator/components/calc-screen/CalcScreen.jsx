import './CalcScreen.scss';

const CalcScreen = ({
    display
}) => {
    return (
        <header className="calc-screen">
            <p className="calc-screen__formula">{display.formula.join(' ')}</p>
            <p id='display' className="calc-screen__output">{display.output}</p>
        </header>
    );
}

export { CalcScreen };
