
import React, { useState } from "react";
import "../assets/css/editModal.css"
import axios from "axios";



const EditStudentModal = (props) => {
    const { setShowEditModal, selectedStudent, students, setDidUpdate, didUpdate } = props;

    const [stdNum, setStdNum] = useState(selectedStudent.studentNumber);
    const [name, setName] = useState(selectedStudent.name);
    const [surname, setSurname] = useState(selectedStudent.surname);
    const [stdClass, setStdClass] = useState(selectedStudent.class);

    const { handleEdit } = (event) => {
        event.preventDefault();
        if (stdNum === "" || name === "" || surname === "" || stdClass === "") {
            alert("Boş alanları doldurunuz!")
            return;
        }
        const filteredStudents = students.filter(item => item.id !== selectedStudent.id)

        const hasStudent = filteredStudents.find((item) => item.studentNumber === stdNum)
        if (hasStudent !== undefined) {
            alert("Bu numarada öğrneci zaten kayıtlıdır.");
            return;
        }

        const updatedStudent = {
            ...selectedStudent,
            name: name,
            surname: surname,
            studentNumber: stdNum,
            class: stdClass
        }


        axios.put(`http://localhost:3004/students${selectedStudent.id}`, updatedStudent)
            .then((response) => {
                setShowEditModal(false)
                setDidUpdate(!didUpdate)


            })
            .catch((err) => { console.log(err) })
    }




    return (
        <div className="modalMainContainer">
            <div className="modalContainer">
                <h1 className="modalTitle">Öğrenci Düzenle</h1>
                <form onSubmit={handleEdit} className="w-75 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="stdNum" className="form-label">Öğrenci no</label>
                        <input value={stdNum} onChange={(event) => setStdNum(event.target.value)} type="text" className="form-control" id="stdNum" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stdNum" className="form-label">Adı</label>
                        <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="stdNum" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stdNum" className="form-label">Soyadı</label>
                        <input value={surname} onChange={(event) => setSurname(event.target.value)} type="text" className="form-control" id="stdNum" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stdNum" className="form-label">Sınıfı</label>
                        <input value={stdClass} onChange={(event) => setStdClass(event.target.value)} type="text" className="form-control" id="stdNum" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-danger mx-3" onClick={() => setShowEditModal(false)}>Kapat</button>
                        <button className="btn btn-outline-primary" type="Submit" >Kaydet</button>
                    </div>
                </form>

            </div>
        </div>



    )
}

export default EditStudentModal;