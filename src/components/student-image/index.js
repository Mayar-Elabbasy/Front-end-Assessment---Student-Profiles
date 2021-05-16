function StudentImage(props) {
    return (
        <img
            src={props.pic} 
            alt={`${props.firstName} ${props.lastName}`}
            className="float-left img-fluid student-avatar m-2 ml-3 mt-3 rounded-circle"
        />
    )
}

export default StudentImage;