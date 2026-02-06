"use client";

import Image from "next/image";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BudgetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  {
    icon: "/icons/setting.svg",
    title: "Set up annual budgets by account category",
    description: "Allocate funds across income and expense lines with full visibility.",
  },
  {
    icon: "/icons/trend-up.svg",
    title: "Track actuals vs budget in real time",
    description: "See how your community is performing against plan, month by month.",
  },
  {
    icon: "/icons/graph.svg",
    title: "Adjust figures and forecast with ease",
    description: "Edit amounts, apply percentage changes, or roll forward last year's data-all in one place.",
  },
];

export default function BudgetingDialog({
  open,
  onOpenChange,
}: BudgetingDialogProps) {
  const handleCreateBudget = () => {
    toast.success("Budget created successfully!", {
      description: "Your budget has been set up and is ready to use.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[438px] w-full p-0 overflow-hidden"
        style={{ border: "none" }}
      >
        <div className="w-full">
          <Image
            src="/images/budgeting.svg"
            alt="Budgeting"
            width={438}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>
        
        <div className="px-[48px] py-[24px] bg-white">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-semibold text-black-3">
              Budgeting
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-6 h-6 mt-0.5">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-black-3 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-normal text-black-4 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateBudget}
            className="w-full h-[46px] rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#18181B" }}
          >
            Create Budget
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
