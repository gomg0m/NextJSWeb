import Axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";


export default function Login() {
    const router = useRouter();

    function login() {
        Axios.post("/api/login").then((res)=>{
            if(res.status == 200){
                //login 성공
                router.push("/admin");
                console.log('Hello');
            }
        });
    }
    return(
            <div>
                <Form>
                    <Form.Field inline>
                        <input placeholder="ID" />
                    </Form.Field>
                    <Form.Field inline>
                        <input type="password" placeholder="Password" />
                    </Form.Field>
                    <Button color="blue" onClick={login}>Login</Button>
                </Form>
            </div>
    );
};