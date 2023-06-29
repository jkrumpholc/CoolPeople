import { useState } from 'react';
import {render} from "react-dom";

var user = [{
    "First_Name": "Jan",
    "Surname": "Krumpholc",
    "Email": "jankrumpholc99@gmail.com",
    "Phone_Number": "+420774816216"
}];

export default function MyApp() {
    return (
        <div>
            <h1>Table of contacts</h1>
            <UserFields/>
            <br/>
            <h2>Table:</h2>

            <MyTable/>
        </div>
    );
}
function UserFields(){
    function InsertData() {
        user.push({First_Name: First_Name, Surname: Surname, Email: Email, Phone_Number: Phone})
        console.log(user)

    }

    let [First_Name, set_First_Name] = useState("");
    let [Surname, set_Surname] = useState("");
    let [Email, set_Email] = useState("");
    let [Phone, set_Phone] = useState("");

    function Submit() {
        alert("Data submitted: " + First_Name + ", " + Surname + ", " + Email + ", " + Phone);
        First_Name = ""
        Surname = ""
        Email = ""
        Phone = ""
        event.preventDefault();

    }

    return (
        <form onSubmit={Submit}>
            <label>First Name:</label>
            <br/>
            <input type="text" name="first_name" value={First_Name} onChange={(e) => set_First_Name(e.target.value)}/>
            <br/>
            <label>Surname:</label>
            <br/>
            <input type="text" name="surname" value={Surname} onChange={(e) => set_Surname(e.target.value)}/>
            <br/>
            <label>Email:</label>
            <br/>
            <input type="email" name="email" value={Email} onChange={(e) => set_Email(e.target.value)}/>
            <br/>
            <label>Phone Number:</label>
            <br/>
            <input type="text" name="phone" value={Phone} onChange={(e) => set_Phone(e.target.value)}/>
            <br/>
            <br/>
            <input type="submit" value="Submit" onClick={InsertData}/>
            <br/>
        </form>
    )
}



function MyTable(){
    function DeleteButton(person) {
        function DeleteData() {
            user.splice(user.indexOf(person.person), 1)
            set_table_data(user)
        }
        return (
            <button type="button" value={person.First_Name} onClick={DeleteData}>Delete</button>
        )}
    let [table_data, set_table_data] = useState([])
    return (
        <table>
            <tbody>
            <tr>
                <th>First Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
            </tr>
            {user.map(person =>
                <tr>
                    <td>{person.First_Name}</td>
                    <td>{person.Surname}</td>
                    <td>{person.Email}</td>
                    <td>{person.Phone_Number}</td>
                    <td><DeleteButton person={person}/></td>
                </tr>)}
            </tbody>
        </table>
    )
}
