import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center p-6">
      <Image
        src="/profile_normal.jpeg"
        alt="Picture of Zachary Sohovich, owner of Sneaky Crow"
        height="658"
        width="658"
        className="rounded-full inline-block w-1/3"
      />
      <ul className="inline-block m-4 text-base">
        <li>
          <span className="font-bold">Name:</span> Zachary Sohovich
        </li>
        <li>
          <span className="font-bold">Class:</span> Software Engineer
        </li>
        <li>
          <span className="font-bold">Origin:</span> Portland, OR
        </li>
        <li>
          <span className="font-bold">Experience:</span> 20
          <span className="font-light text-sm"> (years)</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
