interface ITitle {
    title: string
};

const Title = (props: ITitle) =>
        <>
            <h1 className="text-xl text-center m-3"
            >
                {/* {props.title.toUpperCase()} */}
                BOLA DE FOGO
            </h1>
            <hr className="bg-gradient-to-r from-sky-400 to-sky-600 pb-1 mb-1" />
        </>

export default Title;