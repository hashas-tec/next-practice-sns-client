interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}

interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: Profile;
}

interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
}
