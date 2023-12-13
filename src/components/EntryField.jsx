const EntryField = ({text}) => {
    return(
        <div className="w-[90%] flex flex-col">
            <p className="font-medium">{text}</p>
            <input className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl"></input>
        </div>
    )
}

export default EntryField;

