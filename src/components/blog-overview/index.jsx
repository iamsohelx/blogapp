"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const BlogOverview = ({ BlogLists }) => {
  const router = useRouter();
  const [currentEditedBlogId, setcurrentEditedBlogId] = useState(null);
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    description: "",
  });


  useEffect(() => {
    router.refresh();
  }, []);

  const deleteByBlogId = async (currentId) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${currentId}`, {
        method: "DELETE",
      });

      const result = await apiResponse.json();
      if (result?.success) router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const updateByBlogId = async (currentId) => {
      setOpenBlogDialog(true)
      setcurrentEditedBlogId(currentId._id);
      setBlogFormData({
        title:currentId.title,
        description:currentId.description
      })

  
  }

  return (
    <div className="h-[calc(100vh-32px)] flex flex-col gap-10 bg-white p-6">
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      </div>
      <AddNewBlog 
      openBlogDialog={openBlogDialog}
      setOpenBlogDialog={setOpenBlogDialog}
      loading={loading}
      setLoading={setLoading}
      blogFormData={blogFormData}
      setBlogFormData={setBlogFormData}
      currentEditedBlogId={currentEditedBlogId}
      setcurrentEditedBlogId={setcurrentEditedBlogId}

      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {!BlogLists ? (
          <h1>Something went wrong</h1>
        ) : (
          BlogLists.map((item) => (
            <Card key={item._id} className="p-5">
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <p className="mt-2 mb-2">{item.description.toString().slice(0,100)}...</p>
              <div className="flex gap-3">
                <Button onClick={() => updateByBlogId(item)}>Edit</Button>
                <Button onClick={() => deleteByBlogId(item._id)}>Delete</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
