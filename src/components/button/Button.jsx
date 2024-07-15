const Button = ({
    id,
    className,
    value,
    onClick,
    children
}) => {
    return (
        <button 
            id={id}
            className={className}
            value={value}
            onClick={onClick}
        >{children}</button>
    );
}

export { Button };
