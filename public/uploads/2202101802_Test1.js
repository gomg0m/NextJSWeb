import React from 'react';
import './Test1.css';

function App() {
  return <X02Show {...x02ShowData} />;
}

export default App;

function X02Show(props) {
  const {
    topname_02Show,
    hyebup_02Show,
    addtext_02Show,
    sortingtext1_02Show,
    sortingtext2_02Show,
    ingplantext_02Show,
    genre_02Show,
    date_02Show,
    ingtitle_02Show,
    about_02Show,
    preProduction_02Show,
    production_02Show,
    postProduction_02Show,
    ingwritebtn1_02Show,
    ingwritebtn2_02Show,
    calendertext_02Show,
    notice_02Show,
    library_02Show,
    today_02Show,
    gogasi2_02Show,
    gogas1_02Show,
    ingIcon102ShowProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <form className="x02-show screen">
        <div className="_show-container">
          <Component63 />
          <div className="topbar_02-show">
            <Component89 />
            <h1 className="top-name_02-show notosanskr-medium-black-24px">
              {topname_02Show}
            </h1>
            <img
              className="body-divide_02-show"
             
              src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/bodydivide-02show@1x.svg"
            />
            <Button />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <div className="flex-row-1">
              <div className="flex-col-1 notosanskr-bold-black-24px">
                <div className="_show-container-1">
                  <div className="hyebup_02-show valign-text-middle">
                    {hyebup_02Show}
                  </div>
                  <div className="add-btn_02-show">
                    <img
                      className="add-icon_02-show"
                     
                      src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/addicon-02show@2x.svg"
                    />
                    <div
                      className="add-text_02-show valign-text-middle notosanskr-medium-white-16px"
                     
                    >
                      {addtext_02Show}
                    </div>
                  </div>
                </div>
                <div className="sorting_02-show notosanskr-normal-black-18px">
                  <div className="sorting-text1_02-show valign-text-middle">
                    {sortingtext1_02Show}
                  </div>
                  <Arrow />
                  <div className="sorting-text2_02-show valign-text-middle">
                    {sortingtext2_02Show}
                  </div>
                  <Arrow />
                </div>
                <div className="_show-container-2">
                  <div className="ing-plan_02-show border-1px-bon-jour">
                    <div className="ing-plan-text_02-show">
                      {ingplantext_02Show}
                    </div>
                    <img
                      className="ing-plan-drop_02-show"
                     
                      src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/ingplandrop-02show@2x.svg"
                    />
                  </div>
                  <div className="genre_02-show notosanskr-medium-black-12px">
                    {genre_02Show}
                  </div>
                  <div className="date_02-show notosanskr-medium-black-12px">
                    {date_02Show}
                  </div>
                </div>
                <div className="ing-title_02-show valign-text-middle">
                  {ingtitle_02Show}
                </div>
                <div className="_show-container-3">
                  <div className="about_02-show valign-text-middle">
                    {about_02Show}
                  </div>
                  <div
                    className="pre-production_02-show valign-text-middle notosanskr-medium-mist-gray-22px"
                   
                  >
                    {preProduction_02Show}
                  </div>
                  <div
                    className="production_02-show valign-text-middle notosanskr-medium-mist-gray-22px"
                   
                  >
                    {production_02Show}
                  </div>
                  <div
                    className="post-production_02-show valign-text-middle notosanskr-medium-mist-gray-22px"
                   
                  >
                    {postProduction_02Show}
                  </div>
                </div>
              </div>
              <div className="search-frame_02-show border-1px-bon-jour"></div>
            </div>
            <div className="ing_02-show border-1px-line">
              <IngIcon102Show />
              <img className="ing-write-btn" src={ingwritebtn1_02Show} />
              <img
                className="ing-divide_02-show"
               
                src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/ingdivide-02show@2x.svg"
              />
              <IngIcon102Show className={ingIcon102ShowProps.className} />
              <img className="ing-write-btn" src={ingwritebtn2_02Show} />
            </div>
          </div>
          <div className="overlap-group">
            <div className="_show-container-4">
              <div className="calender-text_02-show valign-text-middle notosanskr-bold-black-24px">
                {calendertext_02Show}
              </div>
              <div className="notice_02-show valign-text-middle notosanskr-medium-mist-gray-18px">
                {notice_02Show}
              </div>
              <img
                className="vector2_02-show"
               
                src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/vector2-02show@2x.svg"
              />
              <div className="library_02-show valign-text-middle notosanskr-medium-mist-gray-18px">
                {library_02Show}
              </div>
            </div>
            <div className="cal-frame_02-show border-1px-line"></div>
            <div className="_show-container-5">
              <div className="today_02-show">
                {today_02Show}
              </div>
              <a href="javascript:SubmitForm('form3')">
                <div className="go-gasi-btn2_02-show border-1px-bon-jour">
                  <div className="go-gas notosanskr-medium-gray-12px">
                    {gogasi2_02Show}
                  </div>
                </div>
              </a>
              <div className="today-frame_02-show border-1px-line"></div>
              <a href="javascript:SubmitForm('form3')">
                <div className="go-gasi-btn1_02-show border-1px-bon-jour">
                  <div className="go-gas notosanskr-medium-gray-12px">
                    {gogas1_02Show}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


function Component63() {
  return <div className="topline_02-show border-1px-silver"></div>;
}


function Component89() {
  return (
    <div className="top-title_02-show">
      <X7ZMY0k />
      <div className="gongyoen_02-show notosanskr-bold-black-18px">
        공연협업공간
      </div>
    </div>
  );
}


function X7ZMY0k() {
  return (
    <div className="logo_02-show">
      <img
        className="logo-group_02-show"
       
        src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/logogroup-02show@2x.svg"
      />
    </div>
  );
}


function Button() {
  return (
    <a href="javascript:SubmitForm('form3')">
      <div className="home-btn_02-show">
        <VariantcontainedSizemediumContentTy />
      </div>
    </a>
  );
}


function VariantcontainedSizemediumContentTy() {
  return (
    <div className="homebase-btn_02-show">
      <div className="hometext-btn_02-show notosanskr-medium-gray-16px">
        지식기반 플랫폼 바로가기
      </div>
    </div>
  );
}


function Arrow() {
  return <div className="arrow"></div>;
}


function IngIcon102Show(props) {
  const { className } = props;

  return (
    <div className={`ing-icon1_02-show ${className || ""}`}>
      <img
        className="vector-group"
       
        src="https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/vectorgroup2-02show@2x.svg"
      />
    </div>
  );
}

const ingIcon102Show2Data = {
    className: "ing-icon2_02-show",
};

const x02ShowData = {
    topname_02Show: "대시보드",
    hyebup_02Show: "협업 공연",
    addtext_02Show: "새로운 공연 추가",
    sortingtext1_02Show: "최근 생성순",
    sortingtext2_02Show: "모든상태",
    ingplantext_02Show: "계획중",
    genre_02Show: "장르",
    date_02Show: "일시",
    ingtitle_02Show: "공연 진행상황",
    about_02Show: "About",
    preProduction_02Show: "Pre-Production",
    production_02Show: "Production",
    postProduction_02Show: "Post-Production",
    ingwritebtn1_02Show: "https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/ingwritebtn1-02show@1x.png",
    ingwritebtn2_02Show: "https://anima-uploads.s3.amazonaws.com/projects/61ea148ac0ee3d1fb04645b9/releases/61ea6df0861d7f1032d5ed5e/img/ingwritebtn2-02show@1x.png",
    calendertext_02Show: "일정",
    notice_02Show: "공지사항",
    library_02Show: "자료실",
    today_02Show: "Today",
    gogasi2_02Show: "게시글 바로가기",
    gogas1_02Show: "게시글 바로가기",
    ingIcon102ShowProps: ingIcon102Show2Data,
};

