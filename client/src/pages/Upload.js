import React, { useEffect,  useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import '../App.css'

const options = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' }
]
const options_seoul = [
  { value: '강남구', label: '강남구' },
  { value: '서초구', label: '서초구' },
  { value: '송파구', label: '송파구' }
]
const options_busan = [
  { value: '중구', label: '중구' },
  { value: '남구', label: '남구' },
  { value: '동구', label: '동구' }
]
const options_daegu = [
  { value: '동래구', label: '동래구' },
  { value: '달서구', label: '달서구' },
  { value: '수성구', label: '수성구' }
]
var options_selected=[]
function Upload(){
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [place, setPlace]=useState("");
    const [place2,setPlace2]= useState();
    const handleChange = (e) => {
      setPlace(e.value);
      if(e.value==='서울') options_selected=options_seoul
      else if(e.value==='부산') options_selected=options_busan
      else if(e.value==='대구') options_selected=options_daegu
    };
    const handleChange2=(e)=>{
      setPlace2(e.value);

    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
      
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("place",place);
        formData.append("place2",place2);
        try {
          const res = await axios.post(
            "/api/upload",
            formData
          );
          console.log(res);
          document.location.href='/search_result'
        } catch (ex) {
          console.log(ex);
        }
      };    
    return(
        <>
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Upload</button>  
                <br></br>
                <Select  options={options} onChange={handleChange} />
                <Select  options={options_selected} onChange={handleChange2} />
            </div>
            
            
        </>
    )
}
export default Upload