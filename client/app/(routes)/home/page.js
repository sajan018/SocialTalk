"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import WritePost from './_components/WritePost';
import PostList from './_components/PostList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Home() {
  const {user}=useUser();
  const [postList,setPostList]=useState([]);
  useEffect(()=>{
      getAllPost();
  },[])
  const getAllPost=()=>{
      GlobalApi.getAllPost().then(resp=>{
          setPostList(resp.data)
      })
  }
  return (
    <div className='p-1 py-10 bg-white xs:p-5 lg:px-10 lg:py-10'>
     {/* {!user? <Banner/>
     
    : */}
    <WritePost getAllPost={()=>getAllPost()} />
    {/* } */}

    <PostList postList={postList}
    updatePostList={()=>getAllPost()} />
    </div>
  )
}

export default Home