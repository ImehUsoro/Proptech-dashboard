import SalesOverview from "@/components/sales-overview";
import ListingsOverview from "@/components/listings-overview";
import UsersOverview from "@/components/users-overview";
import PropertyCarouselsSection from "@/components/property-carousels-section";

export default function DashboardPage() {
  return (
    <div className="px-[4%] md:px-[6.1%] pt-3 pb-7">
      <h1 className="text-xl font-semibold text-black-3 mb-6">Welcome, Ahmed</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
        <div className="w-full lg:w-2/3 flex min-w-0 h-full">
          <SalesOverview />
        </div>
        
        <div className="w-full lg:w-1/3 flex flex-col gap-6 min-w-0">
          <div className="flex-1">
            <ListingsOverview />
          </div>
          <div className="flex-1">
            <UsersOverview />
          </div>
        </div>
      </div>

      <PropertyCarouselsSection />
    </div>
  );
}
