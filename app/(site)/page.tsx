import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <div>
        <Image alt="logo" src="/images/logo.png" height="48" width="48" />
        <h2>Sign in to your account</h2>
      </div>
    </main>
  );
}
