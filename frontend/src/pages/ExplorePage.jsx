import React, { useState } from 'react';
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";


const ExplorePage = () => {

  // https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=10


  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  const explloreRepose = async (language) => {
    setLoading(true);
    setRepos([]);
    try {
      const res = await fetch(`http://localhost:5000/api/explore/repos/${language}`);
      const data = await res.json();
      setRepos(data.repos || []);

      setSelectedLang(language);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-4'>
      <div className='bg-glass max-w-2xl mx-auto rounded-xl p-4'>
        <h1 className='text-xl font-bold text-center mb-7 '>Explore Popular Repositories</h1>
        <div className='flex flex-wrap gap-2 my-2 justify-center cursor-pointer'>
          <img
            onClick={() => explloreRepose("javascript")}
            src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("typescript")}
            src='/typescript.svg' alt='TypeScript' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("c++")}
            src='/c++.svg' alt='C++' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("python")}
            src='/python.svg' alt='Python' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("java")}
            src='/java.svg' alt='Java' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("go")}
            src='/go.svg' alt='Go' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("csharp")}
            src='/csharp.svg' alt='CSharp' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("swift")}
            src='/swift.svg' alt='Swift' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("html")}
            src='/html.svg' alt='Html' className='h-11 sm:h-20 cursor-pointer' />
          <img
            onClick={() => explloreRepose("css")}
            src='/css.svg' alt='CSS' className='h-11 sm:h-20 cursor-pointer' />
        </div>


        {/* checks the confidtion for the repos to be shown */}
        {repos.length > 0 && (
          <h2 className='text-lg font-semibold text-center my-4'>

            <span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
              {selectedLang.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>
        )}

        {!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
        {loading && <Spinner />}


      </div>
    </div>
  );
};

export default ExplorePage;