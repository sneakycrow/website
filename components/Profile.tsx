import Image from "next/image";

const Profile = () => {
  return (
    <div className="mx-auto max-w-[1000px] flex flex-col md:flex-row items-center w-full">
      <Image
        src="/profile_normal.jpeg"
        alt="Picture of Zachary Corvidae, owner of Sneaky Crow"
        height="200"
        width="200"
        className="rounded-full inline-block my-4 self-center"
      />
      <ul className="inline-flex flex-col md:ml-10 text-base md:text-lg justify-center items-start">
        <li>
          <span className="font-bold">Name:</span> Zachary Corvidae
        </li>
        <li>
          <span className="font-bold">Class:</span> Software Engineer
        </li>
        <li>
          <span className="font-bold">Origin:</span> Portland, OR
        </li>
        <li>
          <span className="font-bold">Experience:</span> 20
          <span className="font-light text-sm md:text-base"> (years)</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
