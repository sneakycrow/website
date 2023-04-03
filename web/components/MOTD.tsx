interface MOTDProps {
  message: string;
  author: string;
  link?: string;
}

const MOTD = (props: MOTDProps) => {
  return (
    <article className="p-6">
      <h3 className="text-xl font-bold after:w-2 after:bg-green-550 after:h-full after:absolute relative after:-skew-x-12 after:ml-2">
        Message of the Day
      </h3>
    </article>
  );
};

export default MOTD;
