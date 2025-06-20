import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      Click
      <Link href="/documents/123">
        <span className="text-blue-500 underline">&nbsp;here&nbsp;</span>
      </Link>
      to go to document id
    </div>
  );
};

export default page;
