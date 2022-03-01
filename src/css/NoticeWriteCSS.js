import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  Page:{
   position: 'relative',
  },

  ContainerMain: {
    display:"flex",
    flexDirection : 'column',
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

  Title: {
    fontSize: "20px",
    fontWeight: 700,
    display:"flex",
    flexDirection : 'row',
    marginTop: '40px',
    width: '800px'
  },

  Content: {
    fontSize: "20px",
    fontWeight: 700,
    display:"flex",
    flexDirection : 'row',
    marginTop: '24px'
  },

  ImgUpload: {
    fontSize: "20px",
    fontWeight: 700,
    display:"flex",
    flexDirection : 'row',
    marginTop: '34px'
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