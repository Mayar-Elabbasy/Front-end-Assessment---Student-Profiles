import React, { useState, useEffect } from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import axios from 'axios';

function AllStudents() {
    let averageOfGrades = 0;
    const [state, setState] = useState({
        students: [],
    });

    useEffect(() => {
        document.querySelector(".main-card").focus();
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
        <Card className="mt-5 mb-5 main-card container" tabIndex="0">
            {state.students.map(student => { 
                return (
                    <div key={student.id}>
                        <div className="row">
                            <div className="col-md-2">
                                <img 
                                    src={student.pic} 
                                    alt={`${student.firstName} ${student.lastName}`}
                                    className="float-left img-fluid student-avatar m-2 ml-3 mt-3 rounded-circle"
                                />
                            </div>
                            <div className="col-md-8 m-1">
                                <h3 className="mt-1 text-left font-weight-bold text-uppercase">
                                    {`${student.firstName} ${student.lastName}`}
                                </h3>
                                <CardBody className="text-left main-font">
                                    <CardText>
                                        <span className="student-data">
                                            Email: {student.email}
                                        </span>
                                        <span className="student-data">
                                            Company: {student.company}
                                        </span> 
                                        <span className="student-data">
                                            Skill: {student.skill}
                                        </span>
                                        <span className="student-data">
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
                                        </span>
                                    </CardText>
                                </CardBody>
                            </div>
                        </div> 
                        <hr />
                    </div> 
                );
            })
            }  
        </Card>
    )
}

export default AllStudents;