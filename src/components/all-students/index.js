import React, { useState, useEffect } from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';

function AllStudents() {
    const [state, setState] = useState({
        students: [],
        searchByStudentName: ''
    });

    useEffect(() => {
        document.querySelector(".main-card").focus();
        axios.get('https://api.hatchways.io/assessment/students').then(response => {
			// console.log(response.data);
            setState({
                searchByStudentName: '',
                students: response.data.students,  
                toggleButton: true,
                openedExpandableListView: false,
                studentID: ''  
            })  
		}).catch(error => {
			console.log(error);
		});
    }, []);

    const handleSearchByStudentName = ({target}) => {
        setState({ 
            ...state,
            searchByStudentName: target.value.substr(0,100) 
        });
    }

    const toggleButton = (studentID) => {
        const { openedExpandableListView } = state;

        setState({
            ...state,
            openedExpandableListView: {
              ...openedExpandableListView,
              [studentID]: !openedExpandableListView[studentID],
            },
            studentID: studentID
        })
    }

    let students = state.students.filter((student) => {
        let studentFullName = `${student.firstName} ${student.lastName}`;
        // console.log(studentFullName);
        return student.firstName.toLowerCase().indexOf(state.searchByStudentName.toLowerCase()) >= 0
        || student.lastName.toLowerCase().indexOf(state.searchByStudentName.toLowerCase()) >= 0
        || studentFullName.toLowerCase().indexOf(state.searchByStudentName.toLowerCase()) >= 0;
    });

    return (
        <Card className="mt-5 mb-5 main-card container" tabIndex="0">
            <input type="search" placeholder="Search by name" 
                   onChange={handleSearchByStudentName} />

            {students.map(student => { 
                return (
                    <div key={student.id}>
                        <div className="row">
                            <div className="col-md-2">
                                <img 
                                    src={student.pic} 
                                    alt={`${student.firstName} ${student.lastName}`}
                                    className="float-left img-fluid student-avatar m-2 ml-3 
                                               mt-3 rounded-circle"
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
                                                {/* average of grades for each student */}
                                                <span className="mb-2">
                                                    {student.grades.reduce((sum, grade) =>
                                                        sum + Number(grade), 0) / student.grades.length}
                                                    {`${"%"}`}
                                                    <br />
                                                    <br />
                                                </span>

                                                {/* expandable list view for each student */}
                                                    {student.grades.map((grade, index) => {         
                                                        return (
                                                            <React.Fragment key={index}>
                                                                {state.openedExpandableListView[student.id] ?
                                                                    <span className="grade">
                                                                        <span className="mr-3">
                                                                            {`Test ${index+1}:`}
                                                                        </span>   
                                                                        {`${grade}${"%"}`}
                                                                    </span>
                                                                : 
                                                                <React.Fragment></React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        ) 
                                                        })    
                                                    }
                                                </React.Fragment>
                                                :
                                                <React.Fragment></React.Fragment>
                                            }
                                            </span>
                                        </span>
                                    </CardText>
                                </CardBody>
                            </div>
                            <div className="col-md-1">
                                <button className="test-scores-toggle-button"
                                    onClick={() => {toggleButton(student.id)}}>
                                    {state.openedExpandableListView[student.id] ? 
                                        <FaMinus size="1.50em" /> 
                                        :
                                        <FaPlus size="1.50em" />
                                    }     
                                </button>
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