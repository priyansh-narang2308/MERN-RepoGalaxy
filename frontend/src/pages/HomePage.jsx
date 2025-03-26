import React from 'react'
import Search from '../components/Search';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';
import SortReposiry from '../components/SortReposiry';

const HomePage = () => {
  return (
    <div className='m-4'>
      <Search />
      <SortReposiry/>
      <div className='flex gap-5 flex-col lg:flex-row justify-center items-start'>
        <ProfileInfo />
        <Repos />
        <Spinner />
      </div>
    </div>
  );
};

export default HomePage