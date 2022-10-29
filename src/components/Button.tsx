interface Button {
    label: string,
    click(): void
};

const Button = (props: Button) => {

    return (
        <button
            onClick={props.click}
            className="w-1/3 py-4 bg-sky-600 text-white active:bg-sky-500"
        > { props.label }</button >
    );
};

export default Button;