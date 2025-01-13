interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl">{title}</h2>
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md ">
          {children}
        </div>
      </div>
    </>
  );
};
