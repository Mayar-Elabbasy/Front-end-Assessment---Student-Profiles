import React from 'react';
import { CardText } from 'reactstrap';

function StudentData(props) {
    return (                 
        <CardText>
            <span className="student-data">
                Email: {props.email}
            </span>
            <span className="student-data">
                Company: {props.company}
            </span> 
            <span className="student-data">
                Skill: {props.skill}
            </span>
            <span className="student-data">
                Average: 
                <span className="ml-1">
                {(props.grades.length > 0)?
                    <React.Fragment>
                    {/* average of grades for each student */}
                    <span className="mb-2">
                        {props.grades.reduce((sum, grade) =>
                            sum + Number(grade), 0) / props.grades.length}
                        {`${"%"}`}
                    </span>

                    {/* expandable list view for each student */}
                        {props.grades.map((grade, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {props.openedExpandableListView[props.id] ?
                                        <span className="grade">
                                            <span className="mr-3">
                                                {`Test ${index+1}:`}
                                            </span>
                                            {`${grade}${"%"}`}
                                        </span>
                                    : 
                                    null
                                    }
                                </React.Fragment>
                            ) 
                            })  
                        }
                    </React.Fragment>
                    :
                    null
                }
                </span>
            </span>
        </CardText>
    )
}

export default StudentData;