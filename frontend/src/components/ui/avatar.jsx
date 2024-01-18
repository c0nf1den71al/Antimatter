"use client"

import Avvvatars from "avvvatars-react";
import { useRouter } from "next/navigation";

export function Avatar({...props}) {
    const router = useRouter()

    if(props.clickable) {
        return (
            <div className="cursor-pointer">
                <Avvvatars {...props}/>
            </div>
        )
    } else {
        return <Avvvatars {...props}/>
    }
    
}