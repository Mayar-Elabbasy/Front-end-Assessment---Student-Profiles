import { Fragment } from 'react';
import { CardText } from 'reactstrap';

function StudentData(props) {
    const averageOfGradesPerStudent = 
        `${props.grades.reduce((sum, grade) => 
            sum + Number(grade), 0) / props.grades.length} ${"%"}`;

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
                    <Fragment>
                        <span className="mb-2">
                            {averageOfGradesPerStudent}   
                        </span>

                        {/* expandable list view for each student */}
                        {props.grades.map((grade, index) => {
                            return (
                                <Fragment key={index}>
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
                                </Fragment>
                            ) 
                            })  
                        }
                    </Fragment>
                    :
                    null
                }
                </span>
            </span>
        </CardText>
    )
}

export default StudentData;