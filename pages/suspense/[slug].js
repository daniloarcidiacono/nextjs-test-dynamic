import Link from 'next/link';
import dynamic from 'next/dynamic';
import React from 'react';

export default function PostsPage({name}) {
    const Component = dynamic(
        () => import(`../../components/TestComponent`),
        {
            suspense: true,
            ssr: true
        }
    );


    console.log("Rendering...");

    return (
        <div>
            <h1>Dynamic import with React.Suspense - {name}</h1>
            <p>React.Suspense is resolved on the server, however when the client rehydrates the Loading span is shown for a moment.</p>
            <p>But more importantly, when the client navigates to another slug, an infinite rendering loop is triggered (check the browser console).</p>

            <React.Suspense fallback={<span>Loading...</span>}>
                <Component />
            </React.Suspense>
            <Link href='/suspense/first'>First post</Link>
            <Link href='/suspense/second'>Second post</Link>
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
