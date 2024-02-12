"use client"
import apiClient from '@/lib/apiClient';
// import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// const initialUserInfo: UserType = {
//     id: number;
//   username: string;
//   email: string;
//   password: string;
//   posts: PostType[];
//   profile: initialProfile;
// }

// const initialProfile: Profile = {
//     id: 0,
//   bio: "",
//   profileImageUrl: "",
//   userId: 0,
//   user: null,
// }

const UserProfile = () => {
    const [profile, setProfile] = useState<Profile>();
    const [posts, setPosts] = useState<PostType[]>([]);
    const params = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
           const response = await apiClient.get(`/users/profile/${params.userId}`);
           setProfile(response.data)
        } 

        const fetchPosts = async () => {
            try {
                const response = await apiClient.get(`/posts/${params.userId}`);
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile()
        fetchPosts()
    }, [params])


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img src={profile?.profileImageUrl} className="w-20 h-20 rounded-full mr-4" alt="User Avatar" />
            <div>
              <h2 className="text-2xl font-semibold mb-1">{profile?.user?.username}</h2>
              <p className="text-gray-600">{profile?.bio}</p>
            </div>
          </div>
        </div>
        {posts.map(post => {
            return (
                <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                        <img src={profile?.profileImageUrl} className="w-10 h-10 rounded-full mr-2" alt="User Avatar" />
                        <div>
                            <h2 className="font-semibold text-md">{post.author.username}</h2>
                            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default UserProfile
