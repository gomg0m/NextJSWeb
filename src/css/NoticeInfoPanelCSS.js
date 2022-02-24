import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  Page:{
   position: 'relative',
  },

  ContainerMain1: {
    display:"flex",
    flexDirection : 'column',
    postion: 'relative',
    top:'30px',
  },

  ContainerSub1: {
    display:"flex",
    flexDirection : 'column',
  },

  Label1: {
    fontSize: "24px",
    fontWeight: 700,
  },

  Label2: {
    fontSize: "20px",
    fontWeight: 700,
  },

  Label3: {
    fontSize: "14px",
    fontWeight: 700,
  },

  ContainerSub2: {
    display:"flex",
    flexDirection : 'column',
    position:'relative',
    top:'10px'
  },

  TitleNotice: {
    fontSize: "30px",
    fontWeight: 700,
    postion: 'relative',
    top: '10px',
    left: '10px',
    marginTop: '40px'    
  },

  Content: {
    fontSize: "20px",
    fontWeight: 700,
    display:"flex",
    flexDirection : 'row',
    marginTop: '24px'
  },

  ImgUpload1: {
    fontSize: "20px",
    fontWeight: 700,
  },


  ContainerSub3: {
    display:"flex",
    flexDirection : 'row',
    justifyContent: 'center',
    marginTop: '83px'
  },

  Button1: {
    fontSize: "16px",
    fontWeight: 700,
    width:106,
    height:48,
    fontStyle: "normal",
    marginLeft:'20px',
    marginTop : '20px',
    backgroundColor:'#2D9CDB'
  },

  Button2: {
    fontSize: "16px",
    fontWeight: 700,
    width:106,
    height:48,
    fontStyle: "normal",
    marginLeft:'20px',
    marginTop : '20px',
    color:'black',
    backgroundColor:'#FFFFFF'
  },

});