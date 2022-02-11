import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';  // 자바스크립트에서 dates를 다루기 위한 API
import 'moment/locale/ko';  // 한국어로 표시
import styled from 'styled-components';  // 자바스크립트 CSS만으로 리액트 컴포넌트 스타일링
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';  // 리액트가 제공하는 UI icons
// import Day from './Day';

function Calendar({ history }) {

  // const { thisMonth, isOpenEditPopup, isFilter } = useSelector((state) => state.schedule);  // ??? Redux
  const [current, setCurrent] = useState(moment());  // 현재 날짜

  const movePrevMonth = () => { setCurrent(current.clone().subtract(1, 'month')); };  // 이전 달로 이동
  const moveNextMonth = () => { setCurrent(current.clone().add(1, 'month')); };  // 다음 달로 이동

  const generate = () => {
    // 1년 = 52주 (이번 해의 첫 번째 주(1월 1일이 속한 주)라면 53으로 세팅)
    const startWeek = current.clone().startOf('month').week();  // 이번 달의 첫 날로 설정한 후 일 년 중 몇 번째 주인지
    const endWeek = (current.clone().endOf('month').week() === 1) ? 53: current.clone().endOf('month').week();  // 이번 달의 마지막 날로 설정한 후 일 년 중 몇 번째 주인지 

    // 날짜 (주마다 일을 표기하기 위해 len이 7인 배열 생성)
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Weekend className='row' key={week}> 
          {Array(7)
            .fill(0)
            .map((n, idx) => {
              const noFormatDate = current   // 오늘은 주어진 주의 시작 -> (n+i)일 만큼 더해서 각 주의 '일'을 표기 (지민이 이해 안 돼)
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(n + idx, 'day');

              const day = noFormatDate.format('D');  // 일 (1~31)
              // const fullDate = noFormatDate.format('l').replaceAll('.', '');  // 1/12/2022 형식
              const isToday = (noFormatDate.format('YYYYMMDD') === moment().format('YYYYMMDD')) ? 'today' : '';  // 오늘이라고 인식되면 today
              const isGrayed = (noFormatDate.format('MM')) === current.format('MM') ? '' : 'grayed';  // 이번 달이 아닌 날짜는 grayed

              return(
                // <div className={`box ${isToday} ${isGrayed}`} key={idx}>
                  <Days color={`${isGrayed}`}>
                    <span className="text">{day}</span>
                  </Days>
                // </div>
              );
            })
          }
        </Weekend>
      );
    }
    return calendar;
  }

  return (
    <div>
      <CalendarWrapper>
        {/* 이전 달, 다음 달로 이동 */}
        <Header>
          <MdOutlineArrowLeft className="dir" onClick={movePrevMonth}></MdOutlineArrowLeft>
          <span>{current.format('YYYY')}년 {current.format('MM')}월</span>
          <MdOutlineArrowRight className="dir" onClick={moveNextMonth}></MdOutlineArrowRight>
        </Header>
          <DateContainer>
        {/* 달력에서 가로축 (요일 표시) */}
          <Weekend className='row'>
            <Dow><span>일요일</span></Dow>
            <Dow><span>월요일</span></Dow>
            <Dow><span>화요일</span></Dow>
            <Dow><span>수요일</span></Dow>
            <Dow><span>목요일</span></Dow>
            <Dow><span>금요일</span></Dow>
            <Dow><span>토요일</span></Dow>
          </Weekend>
          {generate()}  
        </DateContainer>
      </CalendarWrapper>
      
    </div>
  );
}

const CalendarWrapper = styled.div`
  position: relative;
`;

const Header = styled.div`
  height: 7vh;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 3px;
  font-size: 1.1em;
  font-weight: bold;

  & > span {
    margin: 0 10px;
  }
  & > .dir {
    color: #cccccc;

    &:hover {
      cursor: pointer;
    }
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
`;

const Weekend = styled.div`
  display: flex;
`;

const Dow = styled.div`
  border-top: 0.5px solid #ebebeb;
  border-bottom: 0.5px solid #ebebeb;
  border-left: 0.5px solid #ebebeb;
  border-right: 0.5px solid #ebebeb;
  background: #f2f2f2;
  width: 100%;
  height: 30px;
  color: #616161;
  font-size: 12px;
  text-align: center;
  padding: 0.7em;
  & span {
  }
`;

const Days = styled.div`
  border-top: 0.5px solid #ebebeb;
  border-bottom: 0.5px solid #ebebeb;
  border-left: 0.5px solid #ebebeb;
  border-right: 0.5px solid #ebebeb;
  // background: #f2f2f2;
  width: 100%;
  height: 100px;
  font-weight: bold;
  color: ${(props) => (props.color ? '#e3e3e3' : 'black')};
  font-size: 12px;
  text-align: right;
  padding: 0.3em;
  & span {
  }
`;

export default Calendar;