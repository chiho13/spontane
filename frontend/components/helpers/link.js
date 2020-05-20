import Link from "next/link";
import {Children} from "react";
import React, {useState, useEffect} from "react";
import {useRouter} from 'next/router'

export default ({children, as, href, ...rest}) => {

   const [pathname, setPathName] = useState();
   const router = useRouter();
   useEffect(() => {
       setPathName(router.pathname);
   },[]);
   return <Link {...rest} href={href} as={as}>
      {React.cloneElement(Children.only(children), {
         className: (pathname === href) ? `active` : null
      })}
   </Link>
};