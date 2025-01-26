export interface UserContextTypes
{
    user: User | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface User
{
    id: string;
    name: string;
    bio: string;
    image: string;
}

export interface Profile extends User
{
    user_id: string;
}

export interface RandomUsers
{
    id: string;
    name: string;
    image: string;
}

export interface CropperDimensions
{
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface ShowErrorObject
{
    type: string;
    message: string;
}

export interface Like
{
    id: string;
    user_id: string;
    post_id: string;
}

export interface Post
{
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    create_at: string;
}

export interface CommentWithProfile
{
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    create_at: string;
    profile: PostWithProfile["profile"]
}

export interface Comment
{
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    create_at: string;
}

export interface PostWithProfile
{
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    create_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface UploadError
{
    type: string;
    message: string;
}

/////////////////////////////
/////////////////////////////

// COMPONENT TYPES

export interface CommentsHeaderCompTypes
{
    params: PostPageTypes["params"];
    post: PostWithProfile;
}

export interface SingleCommentCompTypes
{
    params: PostPageTypes["params"];
    comment: CommentWithProfile;
}

export interface PostMainCompTypes
{
    post: PostWithProfile;
}

export interface PostMainLikesCompTypes
{
    post: PostWithProfile;
}

export interface PostPageTypes
{
    params: {
        userId: string;
        postId: string;
    }
}

export interface PostUserCompTypes
{
    post: Post;
}

export interface ProfilePageTypes
{
    params: {
        id: string;
    }
}

export interface TextInputCompTypes
{
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}

// LAYOUT INCLUDE TYPES
export interface MenuItemsTypes
{
    icon: "For You" | "Following" | "LIVE";
    color: string;
    size?: string | number;
}

export interface MenuItemCompTypes
{
    user: RandomUsers;
}
