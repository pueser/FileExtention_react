//import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {    

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userfile", document.frm.uploadFile.files[0]);
    axios({
      method:'post',
      //url:'http://localhost:8090/fileUpload/extention',
      url:'http://localhost:8090/fileDownload/pdf',
      data: formData,
      responseType: 'arraybuffer',
      
    })
    .then((result)=>{console.log('요청성공')
    console.log(result)
   download(result.data);
  
   
   

    })
      .catch((error)=>{console.log('요청실패')
      console.log(error)
    })

  }
  

async function download(arrayBuffer){

  console.log("arrayBuffer = ", arrayBuffer);

 

  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'downloaded_file.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

};

  return (
    <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
  
    
    <input type="file" name="uploadFile" accept='*' />
    <input type="submit" value="upload" />
    
  </form>
  );
}

export default App;
