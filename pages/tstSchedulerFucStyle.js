import * as React from "react";
import { styled, darken, alpha, lighten } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import ColorLens from "@mui/icons-material/ColorLens";
// import { owners } from "./tstSchedulerData";
import {useState} from 'react';
import { getAllJSDocTags } from "typescript";
import ScheduleInfotWrite from '../src/component/ScheduleWrite';

const PREFIX = "Demo";

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`
};

const owners = [
  {
    text: 'Andrew Glover',
    id: 1,
    color: '#7E57C2',
  }, {
    text: 'Arnie Schwartz',
    id: 2,
    color: '#FF7043',
  }, {
    text: 'John Heart',
    id: 3,
    color: '#E91E63',
  }, {
    text: 'Taylor Riley',
    id: 4,
    color: '#E91E63',
  }, {
    text: 'Brad Farkus',
    id: 5,
    color: '#AB47BC',
  }, {
    text: 'Arthur Miller',
    id: 6,
    color: '#FFA726',
  },
];


const getBorder = (theme) =>
  `1px solid ${
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

// #FOLD_BLOCK
const StyledOpacity = styled(Opacity)(() => ({
  [`&.${classes.rain}`]: {
    color: "#4FC3F7"
  }
}));
// #FOLD_BLOCK
const StyledWbSunny = styled(WbSunny)(() => ({
  [`&.${classes.sun}`]: {
    color: "#FFEE58"
  }
}));
// #FOLD_BLOCK
const StyledFilterDrama = styled(FilterDrama)(() => ({
  [`&.${classes.cloud}`]: {
    color: "#90A4AE"
  }
}));

// #FOLD_BLOCK
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-of-type": {
      borderLeft: "none"
    },
    "&:last-child": {
      paddingRight: 0
    },
    "tr:last-child &": {
      borderBottom: "none"
    },
    "&:hover": {
      backgroundColor: "white"
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0
    }
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: "#FFFDE7"
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: "#ECEFF1"
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: "#E1F5FE"
  },
  [`&.${classes.opacity}`]: {
    opacity: "0.5"
  }
}));
// #FOLD_BLOCK
const StyledDivText = styled("div")(() => ({
  [`&.${classes.text}`]: {
    padding: "0.5em",
    textAlign: "center"
  }
}));
// #FOLD_BLOCK
const StyledDivContent = styled("div")(() => ({
  [`&.${classes.content}`]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center"
  }
}));

// #FOLD_BLOCK
const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6
    }
  }
}));

// #FOLD_BLOCK
const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    flex: "none"
  },
  [`& .${classes.flexContainer}`]: {
    display: "flex",
    alignItems: "center"
  }
}));
// #FOLD_BLOCK
const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent
)(() => ({
  [`&.${classes.apptContent}`]: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2
    }
  }
}));



const WeatherIcon = ({ id }) => {
  switch (id) {
    case 0:
      return <StyledOpacity className={classes.rain} fontSize="large" />;
    case 1:
      return <StyledWbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};

// // #FOLD_BLOCK
// const CellBase = React.memo(
//   ({
//     startDate,
//     formatDate,
//     otherMonth
//     // #FOLD_BLOCK
//   }) => {
//     const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
//     const isFirstMonthDay = startDate.getDate() === 1;
//     const formatOptions = isFirstMonthDay
//       ? { day: "numeric", month: "long" }
//       : { day: "numeric" };
//     return (
//       <StyledTableCell
//         tabIndex={0}
//         className={classNames({
//           [classes.cell]: true,
//           [classes.rainBack]: iconId === 0,
//           [classes.sunBack]: iconId === 1,
//           [classes.cloudBack]: iconId === 2,
//           [classes.opacity]: otherMonth
//         })}
//       >
//         {/* <StyledDivContent className={classes.content}>
//           <WeatherIcon classes={classes} id={iconId} />
//         </StyledDivContent> */}
//         <StyledDivText className={classes.text} onDoubleClick={handleClick}>
//           {formatDate(startDate, formatOptions)}
//         </StyledDivText>
//       </StyledTableCell>
//     );
//   }
// );

// const TimeTableCell = CellBase;

// function handleClick(e){
//   setOpen(true);
// }


  
const Appointment = ({ ...restProps }) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classes.appointment}
  />
);

const AppointmentContent = ({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
);

const FlexibleSpace = ({ ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <ColorLens fontSize="large" htmlColor="#FF7043" />
      <Typography variant="h5" style={{ marginLeft: "10px" }}>
        Art School
      </Typography>
    </div>
  </StyledToolbarFlexibleSpace>
);

var gi = 0;

export default function SchedulerView() {
  
  const [resources, setResources] = React.useState([
    {
      fieldName: "ownerId",
      title: "Owners",
      instances: owners
    }
  ]);
  
 const kkk=
 { 
  id: 0,
  title:"공연 상연",
  startDate: new Date(2022, 1, 23, 2, 0),
  endDate: new Date(2022, 1, 24, 2, 0),
  ownerId: 2
} 
const jjj=
{ 
 id: 1,
 title:"공연 상연",
 startDate: new Date(2022, 1, 25, 2, 0),
 endDate: new Date(2022, 1, 26, 2, 0),
 ownerId: 1
} 
  // #FOLD_BLOCK
  const [appointments, setAppointments] = useState([ 
    kkk
  ]);
    
  
  const [open, setOpen] = useState(false);

  const onClickNoticeWrite = (params) => {
    //1.새로운 의견을 Comment Table에 새로운 행으로 추가
      //Comment Table의 뒷자리수는 RepleID와 동일 
      // let data = {...params}
      // Axios.post("/api/insertNoticeInfo", {data}).then((res)=>{
      //   if (res.status == 200 )
      //   {
      //     console.log("Inserted Notice")
      //      //2. 다시 해당 Comment Table을 읽어와 리렌더링
      //     getNoticeTable()
      //   }
      // })

      let data = [...appointments];
      data.push(jjj)
      console.log(data);
      setAppointments(data);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = (openstate) => {
      let data = openstate;
      setOpen(data);
    }

 

  function getScheduleData(){
    //작성자 (소유자)
    //날짜(시작/끝)
    //내용
    let data = [...appointments];
    //Axios get ==> Select * From DB Table
  }


  React.useEffect(()=>{
    getScheduleData();
  },[appointments]);

  // #FOLD_BLOCK
  function commitChanges({ added, changed, deleted }) {    
      let data = [...appointments];
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      
      setAppointments(data);
      
      //Axios Post ==> Insert To DB Tables

  }

 // #FOLD_BLOCK
const CellBase = React.memo(
  ({
    startDate,
    formatDate,
    otherMonth
    // #FOLD_BLOCK
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: "numeric", month: "long" }
      : { day: "numeric" };
    return (
      <StyledTableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.rainBack]: iconId === 0,
          [classes.sunBack]: iconId === 1,
          [classes.cloudBack]: iconId === 2,
          [classes.opacity]: otherMonth
        })}
      >
        {/* <StyledDivContent className={classes.content}>
          <WeatherIcon classes={classes} id={iconId} />
        </StyledDivContent> */}
        <StyledDivText className={classes.text} onDoubleClick={handleDoubleClickForWrite}>
          {formatDate(startDate, formatOptions)}
        </StyledDivText>
      </StyledTableCell>
    );
  }
);

const TimeTableCell = CellBase;

function handleDoubleClickForWrite(e){setOpen(true);}


    return (
      <Paper>        
        <Scheduler data={appointments}>
          <EditingState onCommitChanges={commitChanges}/>
          <ViewState defaultCurrentDate="2022-02-24" />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          /> 
          
          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}                
          />
          <Resources data={resources} />
          <Toolbar flexibleSpaceComponent={FlexibleSpace} />
          <DateNavigator/>
          <EditRecurrenceMenu/>
          <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
          <AppointmentForm/>
          <DragDropProvider />
        </Scheduler>
        <ScheduleInfotWrite parentFunc={onClickNoticeWrite} open={open} onClose={handleClose}/>
      </Paper>

    );

}
