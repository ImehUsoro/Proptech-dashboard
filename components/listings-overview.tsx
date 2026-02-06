import Image from "next/image";
import Link from "next/link";

export default function ListingsOverview() {
  return (
    <div className="bg-white border border-grey-1 rounded-2xl overflow-hidden flex flex-col h-[152px]">
        <div className="bg-card-header-bg border-b-[0.5px] border-grey-1 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/home-listing.svg"
            alt="Listings"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <h3 className="text-sm font-medium text-card-title">Listings Overview</h3>
        </div>
        <Link href="/listings" className="text-blue-1 text-sm font-normal hover:underline">
          View all &gt;
        </Link>
      </div>
      <div className="p-4 flex-1 flex items-center">
        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Total</p>
            <p className="text-2xl font-bold text-black-3">1.8k</p>
          </div>
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Active</p>
            <p className="text-2xl font-bold text-black-3">80</p>
          </div>
          <div>
            <p className="text-xs font-normal text-black-2 mb-1">Archived</p>
            <p className="text-2xl font-bold text-black-3">1k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
