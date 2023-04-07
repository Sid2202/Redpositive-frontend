import React, { useState, useEffect, useCallback, useLayoutEffect } from "react"
import axios from "axios"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import emailjs from 'emailjs-com';

// type Data ={
//     _id: string,
//     name: string,
//     email: string,
//     contact: string,
//     hobby: string,
// };

export default function UserForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [hobby, setHobby] = useState("")
    const [table, setTable] = useState([])
    const [selected, setSelected] = useState([])
    const [mail, setMail] = useState({})

    const save = async() => {
        if(name && email && contact && hobby){
            const data = {
                name: name,
                email: email,
                contact: contact,
                hobby: hobby,
            }
            axios.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api', data)
            .then((response) => {
                console.log(response)
            })
        }else{
            console.log("Enter all values")
            alert("Enter all values")
        }
        
    }

    

    const getAllData = useCallback( async() => {
        await axios.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api/table')
            .then((response) => {
                setTable(response.data)
            })
    })
    // const table_click =()=>{
    //     console.log(data)
    // }
    // useEffect=(() => {
    //     console.log("helloooo")
    //     // getAllData();
    // },[])
    useLayoutEffect(() => {
        getAllData()
      })


    const addString = (e, item) =>{
        if(e.target.checked){
            console.log('checked'+ item);
            if(!selected.includes(item)){
                selected.push(item)
                console.log(selected)
            }
        }else{
            if(selected.includes(item)){
                for( var i = 0; i < selected.length; i++){
                    if (selected[i] === item){selected.splice(i, 1);}
                }
            }
        }
        
    }
    const selectData = async() =>{
        //get all the data related to that id
        for(var i = 0; i < selected.length; i++){
            for( var j = 0; j < table.length; j++){
                if ( selected[i] === table[j]._id){
                    length = Object.keys(mail).length
                    mail[length]=table[j];
                }
            }
        }
        console.log(mail)
        if(length===0){
            emailjs.send('service_rotcqtg', 'template_9jz9vsi', mail, 'j84VOLnb67AyBh2gf')
            .then((result) => {
                console.log(result.text);
                setMail({})
            }, (error) => {
                console.log(error.text);
            });
        }else{
            alert('Select data to be sent')
        }
        
    }

    const deleteData = async(item) => {
        var data = {_id: item}
        await axios.post('https://main--phenomenal-syrniki-ccf5ba.netlify.app/api/delete', data)
            .then((response) => {
                data={}
        })
    }


    return(
        <div className="h-screen flex flex-col items-center mt-10">
            <div className="p-8 mt-10 flex flex-col items-center">
                <text className="text-3xl font-bold">RedPositive Data Center</text>
                <text className="text-lg italic font-light">Add new data and send selected data to RedPositive</text>
            </div>
            <div className="border p-4 border-black rounded-lg  mt-8">
                <table className=" ">
                    <thead >
                    <tr>
                        <th className="px-2">Select</th>
                        <th className="px-2">Name</th>
                        <th className="px-2">ID</th>
                        <th className="px-2">Email</th>
                        <th className="px-2">Contact</th>
                        <th className="px-2">Hobby</th>
                        <th className="px-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            table?.map(({_id,name,email,contact,hobby})=>(
                                <tr key={_id} className="p-4">
                                    <td className="px-2">
                                        <input type="checkbox" onChange={(e)=>{addString(e, _id)}} /></td>
                                    <td className="px-2">{_id}</td>
                                    <td className="px-2">{name}</td>
                                    <td className="px-2">{email}</td>
                                    <td className="px-2">{contact}</td>
                                    <td className="px-2">{hobby}</td>
                                    <td className="px-2"><button>Update</button>/<button onClick={()=>deleteData(_id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                    
                </table>

            </div>
            
            <div>
            <Popup  trigger=
            {<button className="m-4 p-2 px-4 bg-cyan text-white rounded rounded-2xl"> Add new data</button>}
                modal nested>
                {
                    close => (
                        <div className='flex flex-col m-10 items-center'>
                            <text className="text-2xl font-bold">
                                DATA
                            </text>
                            <text className="">Enter new data into the RedPositivie Data center, all field are necessary</text>
                            <form className="flex flex-col items-center">
                                <label className="m-2"><input className="p-2 border border-cyan  rounded rounded-md" type="text" name="name"  id="name" onChange={e => setName(e.target.value)} placeholder="Name" required />
                                </label>

                                <label className="m-2"><input className="p-2 border border-cyan rounded rounded-md" type="email" name="email" placeholder="Abc@email.com" id="email"  onChange={e => setEmail(e.target.value)} required />
                                </label>
                                
                                <label className="m-2"><input className="p-2 border border-cyan rounded rounded-md" type="text" name="contact" placeholder="Contact number" id="number"  onChange={e => setContact(e.target.value)} required />
                                </label>

                                <label className="m-2"> <input className="p-2 border border-cyan rounded rounded-md" type="text" name="hobbies" placeholder="Hobbies" id="hobby"  onChange={e => setHobby(e.target.value)} required />
                                </label>
                                <div className="flex">
                                    <button className="m-4 p-2 px-4 bg-cyan text-white rounded rounded-2xl" type="button" onClick={save}>Save</button>

                                    <button className="m-4 p-2 px-4 bg-cyan text-white rounded rounded-2xl" onClick={() => close()}>
                                            Close 
                                    </button>
                                </div>
                                
                            </form>  
                        <div>
                    </div>
                </div>
                )
            }
        </Popup>
        <button className="m-4 p-2 px-4 bg-cyan text-white rounded rounded-2xl" onClick={()=>selectData()}>Send data to Redpositive</button>
        </div>
    </div>
    )
}

// export async function getServerSideProps() {

//     const result = axios.post('http://localhost:5080/api/table');
//     const data =  result.data.json();

//     return {
//         props: { data },
//     };
// }