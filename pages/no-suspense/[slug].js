import Link from 'next/link';
import dynamic from 'next/dynamic';
import React from 'react';

export default function PostsPage({name}) {
    const Component = dynamic(
        () => import(`../../components/TestComponent`),
        {
            loading: () => <span>Loading</span>,
            ssr: true
        }
    );

    console.log("Rendering...");

    return (
        <div>
            <h1>Dynamic import only - {name}</h1>
            <p>Component is not rendered  on server side (the loading span is sent to the client)</p>

            <Component />
            <Link href='/no-suspense/first'>First post</Link>
            <Link href='/no-suspense/second'>Second post</Link>
        </div>
    );
}

export function getStaticProps(context) {
    const slug = context.params.slug;
    return {
        props: {
            name: slug.toUpperCase()
        }
    };
};

export function getStaticPaths() {
    return {
        paths: [ 
            { params: { slug: 'first' } },
            { params: { slug: 'second' } }
        ],
        fallback: false
    };
};
