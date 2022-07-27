import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link href='/no-suspense/first'>Dynamic import</Link>
            <Link href='/suspense/first'>Dynamic import With React.Suspense</Link>
        </div>
    );
}
