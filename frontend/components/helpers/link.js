import Link from "next/link";
import {Children} from "react";
import React, {useState, useEffect} from "react";

export default ({children, as, href, ...rest}) => {

   const [pathname, setPathName] = useState();

   useEffect(() => {
       setPathName(window.location.pathname);
   },[]);
   return <Link {...rest} href={href} as={as}>
      {React.cloneElement(Children.only(children), {
         className: (pathname === as) ? `active` : null
      })}
   </Link>
};