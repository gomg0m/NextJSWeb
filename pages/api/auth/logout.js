import { serialize } from "cookie";

// 로그아웃하면 정보에 들어있던 쿠키 값 삭제
export default async function(req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if(!jwt) {
    return res.json({ message: "You are already not logged in..."});
  } else {
    // 두 번째 인자에 토큰 값을 넘겨주지 않으면 로그아웃 처리 (null)
      const serialised = serialize("OursiteJWT", null, {
        httpOnly: true,  
        secure: process.env.NODE_DEV !== "development",
        sameSite :'strict',
        maxAge: -1,  // 로그아웃 버튼 클릭과 동시에 만료: -1
        path: '/',
      });

    res.setHeader('Set-Cookie', serialised);
    res.status(200).json( { messagge: "Success!"} );
  }
}