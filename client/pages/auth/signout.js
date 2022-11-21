import  Router from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/use-request";

const signout = () => {
    const {doRequest} = useRequest({
        url:'/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: ( ) => Router.push('/')
    })
    useEffect(() => {
        doRequest();
      }, []);
    return ( <div className="signout">
        signing you out ...
    </div> );
}
 
export default signout;