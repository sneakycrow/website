import {MDXProvider} from '@mdx-js/react';
import React from "react";


export default function Post(props: React.ComponentProps<any>) {
    return (
        <MDXProvider>
            <main {...props} />
        </MDXProvider>
    );
}