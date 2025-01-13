interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <>
      <div>
        {title ? (
          <h2 className="text-2xl mb-1 font-extralight">{title}</h2>
        ) : null}
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md ">
          {children}
        </div>
      </div>
    </>
  );
};
