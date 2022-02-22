import { NextResponse } from "next/server";
import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  const url = req.url;

  // 로그인 페이지에서 쿠키를 가지고 있다면 
  // 홈페이지의 메인화면으로 이동하기
  if(url.includes('/Login')) {
    if(jwt) {
      // 이미 로그인한 사람이 다시 로그인 페이지로 가려고 하면
      // 로그인 화면으로 이동할 수 없음
      try {
        const user = verify(jwt, secret);
        // 로그인한 사용자의 payload 알기
        console.log(user.level);
        
        return NextResponse.redirect("/Home2");
      } catch(e) {
        return NextResponse.next();
      }
    } 
  }

  // 접근 권한이 없는 사용자가 해당 페이지에 접근하려고 하면
  // 홈페이지의 메인화면으로 이동하기
  if(url.includes('/PlanInfoWrite')) {
    if(jwt === undefined) {
      return NextResponse.redirect("/Home");
    }
  }

  if(url.includes('/Storage')) {
    if(jwt === undefined) {
      return NextResponse.redirect("/Home");
    }
  }
  return NextResponse.next();
}