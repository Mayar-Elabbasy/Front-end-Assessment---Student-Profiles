import React, { useState, useEffect } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios';

function AllStudents() {
    let averageOfGrades = 0;
    const [state, setState] = useState({
        students: [],
    });

    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students').then(response => {
			// console.log(response.data);
            setState({
                students: response.data.students,  
            })		
		}).catch(error => {
			console.log(error);
		});
    }, []);

    return (
        <div>
            {state.students.map(student => { 
                return (
                    <Card key={student.id} className="m-2">
                        <img src={student.pic} alt={`${student.firstName} ${student.lastName}`}
                            className="rounded float-left img-fluid student-avatar m-2 ml-3" />
                        <CardBody className="text-left">
                            <CardTitle tag="h4" className="font-weight-bold">
                                {`${student.firstName} ${student.lastName}`}
                            </CardTitle>
                            <CardText> Email: {student.email} </CardText>
                            <CardText> Company: {student.company} </CardText>
                            <CardText> Skill: {student.skill} </CardText>
                            <CardText>
                                Average: 
                                <span className="ml-1">
                                {(student.grades.length > 0)? 
                                    <React.Fragment>
                                        {student.grades.map(grade => { 
                                            averageOfGrades = 
                                                student.grades.reduce(
                                                    (sum, grade) => 
                                                        sum + Number(grade), 0) / student.grades.length; 
                                                return true;
                                            })
                                        }
                                        {`${averageOfGrades}${"%"}`}
                                    </React.Fragment>
                                    :
                                    <React.Fragment></React.Fragment>
                                }  
                                </span>
                            </CardText>
                        </CardBody>
                    </Card> 
                );
            })
            }   
        </div>
    )
}

export default AllStudents;