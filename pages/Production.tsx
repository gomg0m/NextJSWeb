import React, {useForm, useState} from 'react';
// import Header from './Header';
import styles from '../src/css/Production.module.css';
import {  Box, Button, Divider, Modal, Typography, InputLabel, MenuItem, 
  FormControl, Select, TextField, Paper, InputBase, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Axios from "axios";

interface IFormInput {
  production_id: string;
  production_name: string;
  production_information: string;
  production_discussname: string;
  production_image: string;
  production_addtime: string;
}

const defaultValues = {
  production_id: "",
  production_name:"",
  production_information: "",
  production_discussname: "",
  production_image: "",
  plan_image:"",
  production_addtime: "",
};

type Information = { src:string; width:number; height:number };

var pics = new Array<Information>(); 
var pic_count:number = 0 ;
var imgUploadFileList:string;



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 816,
  height: 666,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

//---------------- Image File Drag&Drop Component ----------------
const ImgUpload = () => {

  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  //--- 이미지 thumbnail의 Delete Icon Button의 이벤트 핸들러
  const deleteHandler =(index) =>{
      console.log("deleting index", index);
      //지워질 이미지 이름 저장.
      let delThumb = thumb[index];

      //이미지 스테이트에 들어있는 모든 이미지 이름을 복사해서
      // newThemb이라는 배열에 넣는다.
      let newThumb = [...thumb];

      //newThumb배열안에 있는 파일 이름 중 
      //클릭한 인덱스의 파일이름을 지워줌
      newThumb.splice(index, 1);

      //새로운 이미지 이름 배열인 newThumb으로
      //setThumb 해준다.
      setThumb(newThumb);
      
      ////미리 저장된 지워질 이미지을 Sever측에 삭제 요청 API를 호출한다.
      const data = "d:/Web_dev/nextjsweb/public/uploads/"+ delThumb;
      console.log("deleting file", data);
      
      Axios.post("/api/deletefile", {data}).then((res)=>{
      if(res.status == 200){
      //       //login 성공
          console.log("파일삭제 결과", res.data.users);
      }
      });

const onDrop = useCallback(
  acceptedFiles => {
      const formData = new FormData();
      const config = { headers: { "content-type": "multipart/form-data" } }

      acceptedFiles.forEach((file) => {        
          formData.append("file", file);
          console.log("acceptFilesNum",acceptedFiles);
      })

      {///let은 Block 내에서만 작용하기 떄문에 newThumb을 사용하려면 이렇게 빈 블럭구분을 사용해야 함.
          let newThumb = [...thumb]; 
          Axios.post<any>("/api/imgupload", formData, config).then((res) => {                 
              setThumb([...thumb, ...res.data]);  
              newThumb =[...thumb, ...res.data];
              console.log("new thumb list", newThumb);
              imgUploadFileList=JSON.stringify(newThumb);
              console.log("imgUplist", imgUploadFileList);
              // /////MySQL에 Upload한 이미지 파일이름 배열 데이터 저장    
              // Axios.post("/api/jsonaccess", {newThumb}).then((res)=>{
              //     if(res.status == 200){
              //         //login 성공
              //         console.log("Upload DB저장 결과", res.data.user);
              //     }
              // });
              // /////
          });    
      }
  }, [thumb]
)

//--- Dropzon Area 설정 및 작동 부분 
const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:true});

const style = useMemo(() => ({
  ...baseStyle,
  ...(isDragActive ? activeStyle : {}),
  ...(isDragAccept ? acceptStyle : {}),
  ...(isDragReject ? rejectStyle : {})
}), [
  isDragActive,
  isDragReject,
  isDragAccept
]);








export const Production = ()=> {
  let boxprops ={ width:400, height:150};
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  const onSubmit = (data: IFormInput) => {
      data.production_id = "9262333";
      data.production_image=imgUploadFileList; //Dropzone에서 등록된 image file list를 data에 추가함.
      console.log("Form data", data);
      Axios.post("/api/insertPlanInfo", {data}).then((res)=>{
          if(res.status == 200){
              //login 성공
              console.log(res.data.users);
              Axios.get("/api/InsertPlanInfo").then((res)=>{
                  if(res.status == 200){
                      //login 성공
                      console.log("last plan_id", res.data.users);
                      let routname = '/PlanInfoPanel/'+String(res.data.users[0].plan_id);
                      Router.push(routname);
                      console.log("routing plan_id", routname);
                  }
              });
          }
      });
  }
}

// function Production() {
  
//   // Modal Open/Close
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // Select information
//   const [info, setInfo] = React.useState('');
//   const handleChange = (event) => {setInfo(event.target.value);};

//   const Input = styled('input')({
//     display: 'none',
//   });
  
//   return (
//     <>
//       {/* <Header /> */}
//         <Box className={styles.prebackground} sx={{ width: 1920, height: '100%', backgroundColor: '#F6F7FB', }} />
//         <div className={styles.presubtitle}>제작공간</div>

//         <Button className={styles.addproductionbutton} variant="contained" onClick={handleOpen}>+ 새로운 프로덕션 추가</Button>

//         <Modal
//           open={open}
//           onClose={handleClose}
//         >
//           <Box sx={style}>
//           <Button className={styles.addclosebutton} variant="text" onClick={handleClose}>X</Button>

//             <Typography className={styles.addtitle}>Production</Typography>
//             <Typography className={styles.addsubtitle}>프로덕션을 추가해주세요.</Typography>
//             <Divider className={styles.modalformdivider} orientation="horizontal" variant="fullWidth" flexItem />

//             <div className={styles.addoption1}>프로덕션명</div>
//             <TextField className={styles.info1} sx={{ minWidth: 570 }} id="outlined-basic" label="프로덕션명을 입력해주세요." variant="outlined"/>

//             <div className={styles.addoption2}>희망연출정보</div>
//             <FormControl className={styles.info2} sx={{ minWidth: 300 }}>
//               <InputLabel id="demo-simple-select-label">희망연출정보</InputLabel>
//               <Select
//                 value={info}
//                 label="info"
//                 displayEmpty
//                 onChange={handleChange}
//               >
//                 <MenuItem value={1}>엔딩 장면 다수의 풍선 날리기</MenuItem>
//                 <MenuItem value={2}>사람형태의 빛 연출</MenuItem>
//                 <MenuItem value={3}>사람만한 과일 모형</MenuItem>
//               </Select>
//             </FormControl>

//             <div className={styles.addoption3}>기술구체화협의명</div>
//             <FormControl className={styles.info3} sx={{ minWidth: 300 }}>
//               <InputLabel id="demo-simple-select-label">기술구체화협의명</InputLabel>
//               <Select
//                 value={info}
//                 label="info"
//                 displayEmpty
//                 onChange={handleChange}
//               >
//                 <MenuItem value={1}>다수의 풍선 날리기 기술구체화협의</MenuItem>
//                 <MenuItem value={2}>사과모형의 기술구체화협의</MenuItem>
//                 <MenuItem value={3}>사람형태의 빛 기술구체화협의</MenuItem>
//               </Select>
//             </FormControl>

//             <div className={styles.addoption4}>대표 이미지</div>
//             <TextField className={styles.info4} sx={{ minWidth: 510 }} id="outlined-basic" label="프로덕션 대표 이미지를 추가해주세요." variant="outlined"/>
//             <Box className={styles.filebackground} sx={{ width: 48, height: 48, backgroundColor: '#F2F2F2', borderRadius: '6px' }} />
//             <label htmlFor="icon-button-file" className={styles.fileuploadbutton}>
//               <Input accept="image/*" id="icon-button-file" type="file" />
//               <IconButton color="inherit" component="span" backgroundColor="#F2F2F2">
//                 <AttachFileIcon />
//               </IconButton>
//             </label>

//             <Button className={styles.addcreatebutton} variant="contained">만들기</Button>

//           </Box>
//         </Modal>



//         <div className={styles.order1}>최근 생성순</div>
//         <div className={styles.order2}>모든상태</div>
//     </>
//   );
// }

// export default Preproduction;