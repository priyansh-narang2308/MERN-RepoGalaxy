import { FaHeart } from 'react-icons/fa';
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const LikeProfile = ({ userProfile }) => {

  const { authUser } = useAuthContext();

  // i should not be able to like my own prfile
  const isOwnProfile = authUser?.username === userProfile.login;


  const handleLikeProfile = async () => {


    // senf thr req to the endpoint
    try {
      const response = await fetch(`/api/users/like/${userProfile.login}`, {
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);

      }
      toast.success(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!authUser && isOwnProfile) {
    return null;
  }

  return (
    <div>
      <button
        className='p-2 text-xs w-31 font-medium cursor-pointer rounded-md bg-glass border border-blue-400 flex items-center gap-2'
        onClick={handleLikeProfile}
      >
        <FaHeart size={16} /> Like Profile
      </button>
    </div>
  );
};

export default LikeProfile;