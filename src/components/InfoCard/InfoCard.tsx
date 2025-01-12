import { ReactElement } from "react";

interface InfoCardProps {
  title: string;
  time: string;
  icon: ReactElement;
}

export const InfoCard = ({ title, time, icon }: InfoCardProps) => {
  return (
    <div className="w-full m-1 flex flex-col items-start p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm font-bold text-black">{title}</div>
      <div className="text-2xl">{time}</div>
    </div>
  );
};
