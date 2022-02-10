import * as fs from 'fs';


export default function handler(req,res){
  async function clean(file){
    fs.unlink(file, function(err){
      if(err) {
        console.log("Error : ", err)
      }
      res.status(200).json({ result: 'File Deleted' })
    })
  }

  console.log("deletefile accessed!!");
  console.log(req.body.data);
  let file2 = req.body.data;
  clean(file2);

  
  
}