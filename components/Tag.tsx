interface TagProps {
  children: string;
}

const Tag = (props: TagProps) => {
  return (
    <div className="text-[12px] text-gray-400 mr-2 inline-block px-4 border-2 border-gray-300 text-center bg-gray-100 rounded-sm">
      {props.children}
    </div>
  );
};

export default Tag;
