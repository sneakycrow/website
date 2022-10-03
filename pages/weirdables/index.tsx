import {MDXProvider} from '@mdx-js/react';
import React from "react";


export default function Weirdable(props: React.ComponentProps<any>) {
    return (
        <MDXProvider>
            <main {...props} />
        </MDXProvider>
    );
}