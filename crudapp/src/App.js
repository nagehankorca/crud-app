import React, { useEffect, useState } from "react";

import axios from "axios";

import EditStudentModal from "./components/EditStudentModal";

function App() {
  const [searchText,setSearchText]= useState("")
  const [students, setStudents] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [stdNumber, setStdNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [didUpdate, setDidUpdate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({
    id: '',
    studentNumber: '',
    name: '',
    surname: '',
    class: ''

  })
  useEffect(() => {
    axios.get("  http://localhost:3004/students")
      .then((response) => {
        setStudents(response.data);

      })
      .catch((error) => { console.log(error) })
  }, [didUpdate]);
  useEffect(()=>{
    if(students !== null){
      const filteredStudents =students.filter(item => item.name.includes(searchText))
      console.log(filteredStudents)

    }
  },[searchText])

  const handleAdd = (event) => {
    event.preventDefault();
    if (stdNumber === "" || name === "" || surname === "" || stdClass === "") {
      alert("Boş alanları doldurunuz!")
      return
    }
    const hasStudent = students.find(item => item.studentNumber === stdNumber)
    if (hasStudent !== undefined) {
      alert("Aynı no dan kayıtlı var!")
      return
    }
    const newStudent = {
      id: String(new Date().getTime()),
      studentNumber: stdNumber,
      name: name,
      surname: surname,
      class: stdClass
    }
    axios.post("http://localhost:3004/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent])
        setShowAddForm(false)
        setName("")
        setSurname("")
        setStdNumber("")
        setStdClass("")

      })
      .catch((err) =>  console.log(err) )

  }
  const handleDelete = (studentId) => {
    axios.delete(`http://localhost:3004/students/${studentId}`)
      .then((response) => {
        setDidUpdate(!didUpdate)

      })
      .catch((err) => { console.log(err) })
  }
  if (students === null) {
    return (<h1>
      Loading...
    </h1>)
  }
  var filteredStudents=[]
  filteredStudents=students.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()))


  return (
    <div >
      <nav className="navbar navbar-light bg-primary navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Crud App</a>
        </div>
      </nav>
      <div className="container my-5">
        <div className="d-flex justify-content-between">
        <input value={searchText} onChange={(event)=> {setSearchText(event.target.value)}} type="text" className=" w-75 form-control" placeholder="Type to search.."/>
          <button onClick={() => { setShowAddForm(!showAddForm) }} className="btn btn-primary">Öğrenci Ekle</button>
        </div>
        {
          showAddForm === true && (
            <form onSubmit={handleAdd} className="w-50 mx-auto">
              <div className="mb-3">
                <label htmlFor="stdNum" className="form-label">Öğrenci no</label>
                <input value={stdNumber} onChange={(event) => setStdNumber(event.target.value)} type="text" className="form-control" id="stdNum" />
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
                <button type="Submit" className="btn btn-outline-primary">Kaydet</button>
              </div>
            </form>
          )
        }
        <table className="table">
          <thead>
            <tr>
              <th >Öğrenci no</th>
              <th >Adı</th>
              <th >Soyadı</th>
              <th >Sınıfı</th>
              <th >İşlem</th>

            </tr>
          </thead>
          <tbody>
            {
              filteredStudents.map((students) => (
                <tr key={students.id}>
                  <td>{students.studentNumber}</td>
                  <td>{students.name}</td>
                  <td>{students.surname}</td>
                  <td>{students.class}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(students.id) }}>Sil</button>
                    <button onClick={() => {
                      setShowEditModal(true);
                      setSelectedStudent(students)
                    }}
                      className="btn btn-sm btn-secondary">Düzenle</button>
                  </td>

                </tr>

              ))}
          </tbody>
        </table>
      </div>
      {
        showEditModal && (<EditStudentModal students={students} setDidUpdate={setDidUpdate} didUpdate={didUpdate} selectedStudent={selectedStudent} setShowEditModal={setShowEditModal} />)
      }
    </div>
  );
}

export default App;
