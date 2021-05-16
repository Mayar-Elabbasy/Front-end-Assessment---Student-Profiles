import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import StudentImage from '../student-image/index';
import StudentData from '../student-data/index';
import StudentTag from '../student-tag/index';

function AllStudents() {
    const [state, setState] = useState({
        students: [],
    });

    useEffect(() => {
        document.querySelector(".main-card").focus();
        axios.get('https://api.hatchways.io/assessment/students').then(response => {
            for(let i = 0; i < response.data.students.length; i++) {
                response.data.students[i].studentTags = [];
            }
            setState({
                searchByStudentName: '',
                students: response.data.students,  
                toggleButton: true,
                openedExpandableListView: false,
                studentID: '',
                tag: '',
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

    const handleFields = ({target}) => {
        setState({
            ...state,
            [target.name]: target.value
        })
    }

    const addNewTag = (event, studentID) => { 
        /* 
        This function handles adding new tag as it 
        first of all, check if enter is pressed then it loops over all the students
        and make sure that the student's id matches the arguments passed with the function
        and after checking the tag is added to the array of tags specified for this student 
        and finally, clear the input filed after adding the tag successfully in the array
        */

        if(event.key === 'Enter') {
            for(let i = 0; i < state.students.length; i++) {
                
                if (state.students[i].id === studentID) {
                    state.students[i].studentTags = [...state.students[i].studentTags];
                    state.students[i].studentTags.push(state.tag);

                    // clear (Add a tag) input field after enter is pressed
                    if(document.querySelectorAll(".tag").length > 1) {
                        document.querySelectorAll(".tag")[i].value = '';    
                    } else {
                        document.querySelectorAll(".tag")[0].value = '';
                    }

                    setState({
                        ...state,
                        students: state.students,
                        tag: ''      
                    })
      
                } else if (state.students[i].id !== studentID) {
                    state.students[i].studentTags = [...state.students[i].studentTags]
                    continue;
                }
            }    
        }    
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
                <React.Fragment key={student.id}>
                <div className="row">
                    <div className="col-md-2">
                        <StudentImage {...student} />
                    </div>
                    <div className="col-md-8 m-1">
                        <h3 className="text-left font-weight-bold text-uppercase">
                            {`${student.firstName} ${student.lastName}`}
                        </h3>
                        <CardBody className="text-left main-font">
                            <StudentData 
                                {...student} 
                                openedExpandableListView={state.openedExpandableListView} 
                            />
                            <StudentTag {...student} />
                        </CardBody>
                        <div className="col-md-2">
                            <input
                                type="text" name="tag" placeholder="Add a tag"
                                className="tag mt-2"
                                onChange={handleFields}
                                onKeyDown={(event) => addNewTag(event,student.id)} />
                        </div>
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
                </React.Fragment>
            );
        })
        }  
        </Card>
    )
}

export default AllStudents;