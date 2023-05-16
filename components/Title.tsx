import cx from "classnames";

const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const classes = cx(
    "text-xl font-bold underline decoration-4 decoration-green-550 text-center lg:text-left",
    className
  );
  return <h3 className={classes}>{children}</h3>;
};

export default Title;
