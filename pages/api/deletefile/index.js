import * as fs from 'fs';


export default function handler(req,res){
  async function clean(file){
    fs.unlink(file, function(err){
      if(err) {
        console.log("Error : ", err)
      }
      res.status(200).json({ users: 'File Deleted' })
    })
  }

  console.log("deletefile accessed!!");
  console.log("삭제요청 파일명", req.body.data);
  let file2 = req.body.data;
  clean(file2);

  
  
}