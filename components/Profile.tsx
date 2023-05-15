import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly md:items-center">
      <Image
        src="/profile_normal.jpeg"
        alt="Picture of Zachary Corvidae, owner of Sneaky Crow"
        height="658"
        width="658"
        className="rounded-full inline-block w-1/3 my-4"
      />
      <ul className="inline-block w-full">
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
          <span className="font-light text-xs"> (years)</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
