import { makeStyles } from "@material-ui/core/styles";
import zIndex from "@mui/material/styles/zIndex";

export const useStyles = makeStyles({
 
  ContainerMain: {
    display:"flex",
    flexDirection : 'column',
    position : "relative",
    width : '450px',
    left: '0px',
    top: '0px',
    marginLeft:'0px',
    marginTop : '10px',
    zIndex:1,
  },

  ContainerSub1: {
    display:"flex",
    flexDirection : 'row',
    position : "relative",
    width : '450px',
    left: '0px',
    top: '0px',
    marginLeft:'0px',
    marginTop : '10px',
  },

  Name: {
    fontSize: "14px",
    fontWeight: 700,
    fontStyle: "normal",
    position : "relative",
    left: '0px',
    top: '0px',
    marginLeft:'0px',
    marginTop : '0px',
    color: 'black',
    backgroundColor: 'white',
  },

  Team: {
    fontSize: "12px",
    fontWeight: 400,
    fontStyle: "normal",
    position : "relative",
    left: '0px',
    top: '0px',
    width:'50px',
    height:'18px',
    paddingLeft:'3px',
    marginLeft:'10px',
    marginTop : '0px',
    color: 'white',
    borderRadius:'5px',
    backgroundColor: 'magenta',
  },

  Lasttime: {
    fontSize: "12px",
    fontWeight: 400,
    fontStyle: "normal",
    position : "relative",
    left: '0px',
    top: '0px',
    marginLeft:'10px',
    marginTop : '0px',
    color: 'gray',
    backgroundColor: 'white',
  },


  Content: {
    fontSize: "15px",
    fontWeight: 400,
    fontStyle: "normal",
    position : "relative",
    left: '0px',
    top: '0px',
    marginLeft:'0px',
    marginTop : '0px',
    color: 'black',
    backgroundColor: 'white',
  },

  ImgUpload: {
    fontSize: "24px",
    fontWeight: 700,
    fontStyle: "normal",
    position : "relative",
    top: '0px',
    left: '0px',
    marginLeft:'0px',
    marginTop : '0px',
    color: 'black',
    backgroundColor: 'white',

  },


});