"use client";

import React, { useEffect, useState } from "react";

export default function ClientOnly({ children }: { children: React.ReactNode })
{
    let [ isClient, setIsClient ] = useState(false);

    useEffect(() =>
    {
        setIsClient(true);
    }, []);

    if (isClient)
        return (<div>{ children }</div>);
    else
        return null;
}
