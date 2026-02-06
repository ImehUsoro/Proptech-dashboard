import Image from "next/image";
import Link from "next/link";

export default function UsersOverview() {
  return (
    <div className="bg-white border border-grey-1 rounded-2xl overflow-hidden flex flex-col h-[152px]">
        <div className="bg-card-header-bg border-b-[0.5px] border-grey-1 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/icons/profile.svg"
              alt="Users"
              width={24}
              height={24}
              className="w-6 h-6"
              style={{ filter: "brightness(0) saturate(100%) invert(28%) sepia(100%) saturate(1000%) hue-rotate(220deg) brightness(95%) contrast(85%)" }}
            />
          </div>
          <h3 className="text-sm font-medium text-card-title">Users Overview</h3>
        </div>
        <Link href="/users" className="text-blue-1 text-sm font-normal hover:underline">
          View all &gt;
        </Link>
      </div>
      <div className="p-4 flex-1 flex items-center">
        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Total</p>
            <p className="text-2xl font-bold text-black-3">20.7k</p>
          </div>
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Riders</p>
            <p className="text-2xl font-bold text-black-3">8.5k</p>
          </div>
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Subscribers</p>
            <p className="text-2xl font-bold text-black-3">7.5k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
