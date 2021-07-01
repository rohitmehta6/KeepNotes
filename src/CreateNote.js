import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import logo from './logo.png'


const CreateNote = () => {

    const [input,setInput]=useState({
        title:"",
        content:""
    })

    const [notes,setNotes]=useState([]);
    const [dupNotes,setDupNotes]=useState([]);
    const [btn, setBtn]=useState(true);
    const [itemToEdit,setItemToEdit]=useState(null);
    const [search, setSearch]=useState("");

    const inputEvent=(event)=>{
        const {name,value}=event.target;

        setInput((preVal)=>{
            return{
                ...preVal,
                [name]:value
            }
        })
    }
    //console.log(input);

    const addHandler=()=>{
        if(input.title===""){
            alert('Pls Enter Title');
        }
        else if(btn===false){
           const edit = notes.map((item,index) => {
                if (index === itemToEdit) {
                    return {
                         title:input.title,
                         content:input.content
                    }
                }
                return item;
            })
            setNotes(edit);
            setDupNotes(edit);
            setInput({title:"",content:""});
            setBtn(true);
            setItemToEdit(null);
        }
        else{
        setNotes((prevData)=>{
            return [...prevData,input];
        })
        setDupNotes((prevData)=>{
            return [...prevData,input];
        })
        setInput({title:"",content:""})
    }
}
    //console.log(notes);

    const deleteHandler=(id)=>{
        const filterValue=notes.filter((item,index)=>{
            return id!==index;
        })
         setNotes(filterValue);
         setDupNotes(filterValue);
    }

    const editHandler=(id)=>{
        setInput({title:notes[id].title, content:notes[id].content});
        setBtn(false);
        setItemToEdit(id);
    }

    const searchItem=(e)=>{
            setSearch(e.target.value);
            if (e.target.value.length === 0) {
                setNotes(dupNotes);
                return;
            }
            const filterValue=dupNotes.filter((item)=>{
                return item.title.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setNotes(filterValue);
    }

    return (
        <>
        <div>
        <div className="header">
          <div className="left-header">
            <img src={logo} alt="logo"/>
            <h1 className="header_text">Keep Notes</h1>
          </div>
          <div className="right-header">
            <input type="text" className="search" onChange={searchItem} value={search} placeholder="Search" autoComplete="off"/>
          </div>
        </div>
        <div className="inputs">

            <input type="text" className="title" name="title" value={input.title} onChange={inputEvent} placeholder="Title" autoComplete="off"/>

            <textarea name="content" value={input.content} onChange={inputEvent} rows="5" columns="5" placeholder="Take a note..." autoComplete="off"/>


            {btn?(<Button onClick={addHandler} class="add_btn">
                <AddIcon/>
            </Button>):(<Button onClick={addHandler} class="add_btn">
                <EditOutlinedIcon/>
            </Button>)}
        

            
        </div>
        

        <div className="all_notes">

            {notes.map((item,index)=>{
                 return(
                    <div key={index} id={index} className="note">
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                         <EditOutlinedIcon className="editIcon" onClick={()=>editHandler(index)}/>
                         <DeleteOutlineIcon className="deleteIcon" onClick={()=>deleteHandler(index)}/>
                         
                    </div>
                )
            })
            }
            </div>
        </div>
        </>
    )
}

export default CreateNote;
