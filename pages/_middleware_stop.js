import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken";

const secret = process.env.SECRET;

export default function middleware(req) {
    const {cookies} = req;

    const jwt = cookies.OursiteJWT;

    const url = req.url;
    
    //const decoded = verify(jwt, secret);


    // console.log("deced", decoded);
    console.log('middleware called~');
    // console.log('jwt', jwt);

    if (url.includes('/Dashboard')) {
        if (jwt== undefined) {
            return NextResponse.redirect("/PlanInfoWrite");  
        }
        try {
            verify(jwt, secret);
            console.log('middleware success');
            return NextResponse.next();
        } catch(e) {
            return NextResponse.redirect('/PlanInfoWrite');
        }
    }

    return NextResponse.next();
}