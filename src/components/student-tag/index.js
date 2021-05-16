import React from 'react';

function StudentTag(props) {
    return (
        <>
        {(props.studentTags && props.studentTags.length > 0)?
            <React.Fragment>
                {props.studentTags.map(
                    (studentTag, index) => {
                        return (
                            <React.Fragment key={index}>
                                <span className="student-tag">
                                    {studentTag}
                                </span>
                            </React.Fragment>
                        ) 
                    })  
                }
            </React.Fragment>
            :
            null
        }
        </>
    )
}

export default StudentTag;