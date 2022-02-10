import React from 'react';
import Header from '../src/fix/Header';
import Leftside from '../src/fix/Leftside3';
import sty from '../src/css/TechDiscussPanel.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
// import HopeTableContent from '../src/component/HopeTable_content';
// import HopeTableObjective from '../src/component/HopeTable_objective';
// import HopeTableTech from '../src/component/HopeTable_tech';
import HopePicture from '../src/component/HopePicture';

function createData(name, content) {
    return { name, content };
  }
  
  function PlanInfoTable() {
  
    const [list, setList] = useState([
      {name: '공연장르', content: ''},
      {name: '공연명', content: ''},
      {name: '공연시작시간', content: ''},
      {name: '공연종료시간', content: ''},
      {name: '공연이미지', content: ''},
      {name: '공연시간', content: ''},
    ]);
  
    var obj = 
        [
        {name: '공연장르', content: ''},
        {name: '공연명', content: ''},
        {name: '공연예상일정', content: ''},
        {name: '공연시간', content: ''},
      ];
  
     
    function getData(){
      Axios.get("/api/getPlanInfo").then((res) =>{
      obj[0].content = res.data.users[0].plan_genre;
      obj[1].content = res.data.users[0].plan_name;
      obj[2].content = res.data.users[0].plan_start + " ~ " + res.data.users[0].plan_end;
      obj[3].content = res.data.users[0].plan_time;
      obj[4].content = res.data.users[0].plan_number;
      obj[5].content = res.data.users[0].plan_budget;
      obj[6].content = res.data.users[0].goal_people;
      obj[7].content = res.data.users[0].goal_price;
      obj[8].content = res.data.users[0].plan_contents;
      obj[9].content = res.data.users[0].plan_exception;
      obj[10].content = res.data.users[0].plan_file;
  
      setList( obj );
      });
    }
  
      useEffect(() => {
        getData();
      }, []);
      
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>          
            {list.map((row) => (
              <TableRow key={row.plan_name}>
                <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                <StyledTableCell2 align="left">{row.content}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default function TheaterInfoPanel(){       
    return(
        <>
        <Header />
        <Leftside />
        <div className={sty.infoframe}>
            <div
                style={{
                    width: "1496px",
                    textAlign: "center",
                    borderBottom: "4px solid #ff0000",
                    lineHeight: "0.2em",
                    margin: "0px 0 20px",                    
                }}></div>
            <div className={sty.layout_top}>
                <div className={sty.layout_top_txt1}>제작공간</div>
                <div className={sty.layout_top_txt2}>엔딩 장면 다수의 풍선 날리기</div>
                <div className={sty.subtitle} style={{margin:"50px 30px 0px"}}>최신 자료</div>
                <div><HopePicture /></div>
           
                <div className={sty.layout_body}>
                    <div className={sty.layout_top_txt1}>희망연출 목표</div>
                </div> 
                
                {/* 협의 완료 버튼 */}
                <div className={sty.button}>    
                    <Button className={sty.notosanskr_bold_black_24px} style={{margin:"50px 20px 0px"}} variant="contained">  검색 </Button>          
                    <Button className={sty.notosanskr_bold_cyan_24px} style={{margin:"50px 20px 0px"}} variant="contained">  협의 완료하기 </Button>
                </div>
            </div>
    </div>
    </>                
    );
}