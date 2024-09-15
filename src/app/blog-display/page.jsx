`use client`
import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

async function FetchBlogData() {
  try{

    const apiResponse = await fetch("http://localhost:3000/api/get-blog",{
      method:"GET",
      cache:"no-store"
    })
   
    const result = await apiResponse.json();   
     
    return result?.data;

  }catch(err){
    console.log(err);
    
  }
}

const Page = async () => {
  const router = useRouter()

  const BlogLists = await FetchBlogData()
  


  return (
    <>
    {/* <BlogOverview BlogLists={BlogLists}/> */}
    <div className="h-[calc(100vh-32px)] flex flex-col bg-white p-6">
     <Button onClick={()=> router.push("/blogs")} className=' text-white self-start px-5 py-2 bg-blue-600 rounded'>Want To Post Blog?</Button>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
       {!BlogLists ? (
          <h1>Something went wrong</h1>
        ) : (
          BlogLists.map((item) => (
            <Card key={item._id} className="p-5">
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <p className="mt-2 mb-2">{item.description.toString().slice(0,100)}...</p>
              <div className="flex gap-3">
                <Button className='py-2 px-4 text-white bg-black rounded' onClick={()=>router.push(`/blog-details?id=${item._id}`)}>Read More</Button>
              </div>
            </Card>
          ))
       )
        }
      </div>
      </div>
      </>

  )
}

export default Page
