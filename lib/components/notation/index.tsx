interface NotationProps {
    notation: string[];
    color: string;
}

function Notation(
    { notation, color }: NotationProps
) {
    return (
        <>
            {
                notation[1] &&
                <div className={`notation row-notation ${color}-notation`}>{notation[1]}</div>
            }
            {
                notation[0] &&
                <div className={`notation col-notation ${color}-notation`}>{notation[0]}</div>
            }
        </>
    )
}

export default Notation;