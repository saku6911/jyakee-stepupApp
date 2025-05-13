import { Header } from "../molecules/header";

export default function NoData() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-10 items-center justify-center h-full bg-red-900 p-20">
        <div className=" bg-white p-20 ">
          <p className="text-center">お気に入りはありません。</p>
        </div>
      </div>
    </>
  );
}
