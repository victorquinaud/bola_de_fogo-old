interface ITitle {
    title: string
};

const Title = (props: ITitle) => {


    return (
        <>
            <h1 className="text-sm text-center m-3"
            >
                {props.title.toUpperCase()}
            </h1>
            <hr className="bg-gradient-to-r from-sky-400 to-sky-600 pb-1 mb-1" />
        </>
    )
};

export default Title;