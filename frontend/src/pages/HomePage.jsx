import React, { useCallback, useEffect, useState } from 'react';
import toast from "react-hot-toast";

import Search from '../components/Search';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';
import SortReposiry from '../components/SortReposiry';

const HomePage = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);



  const [sortType, setSortType] = useState("recent");




  // defualt value will be null
  // use callback to aoid the infinite loop errorr
  const getUserProfileAndRepos = useCallback(async (username = "burakorkmez") => {

    setLoading(true);
    try {

      // this is fort he user profile 
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        }
      });
      const userProfile = await userResponse.json();
      setUserProfile(userProfile);

      // this for the repos
      const repoResponse = await fetch(userProfile.repos_url);
      const repos = await repoResponse.json();
      setRepos(repos);

      // console.log("User profile: ", userProfile);
      // console.log("Repos : ", repos);


      return { userProfile, repos };

    } catch (error) {
      toast.error("Failed to fetch user profile and repos", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {

    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);  //bcoz we want the new user to come 
    const { userProfile, repos } = await getUserProfileAndRepos(username);  ///what value we get we can set this.state.

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //sorting in deconding all yhr three
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };


  return (
    <div className='m-4'>
      {/* it takes the username adn the passwrd */}
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortReposiry onSort={onSort} sortType={sortType} />}
      <div className='flex gap-5 flex-col lg:flex-row justify-center items-start'>


        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {/* {repos.length > 0 && !loading && <Repos repos={repos} />}   THIS IS WRONGG */}
        {!loading && <Repos repos={repos} />}
        {/* only this to show if repos are not found */}


        {loading && <Spinner />}



      </div>
    </div>
  );
};

export default HomePage;