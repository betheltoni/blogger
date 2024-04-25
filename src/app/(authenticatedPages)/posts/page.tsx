'use client';
import React from 'react';
import { IoMdFunnel } from 'react-icons/io';

import Button from '@/components/buttons/Button';
import { InputSearch } from '@/components/input';
import useModal from '@/components/modal/useModal';
import Tab from '@/components/tab';
import useTab from '@/components/tab/useTab';

import { useGetMyPostsQuery } from '@/api/posts';
import CreatePostModal from '@/app/(authenticatedPages)/posts/components/CreatePostModal';
import PostsTable from '@/app/(authenticatedPages)/posts/components/PostsTable';
import { POSTS_TAB } from '@/app/(authenticatedPages)/posts/utils/constants';
import { DEFAULT_FETCH_QUERY_PARAMS } from '@/constant/appConstants';

const PostsPage = () => {
  //get posts
  const { data: publishedPosts } = useGetMyPostsQuery(
    DEFAULT_FETCH_QUERY_PARAMS
  );
  const { data: draftPosts } = useGetMyPostsQuery({
    ...DEFAULT_FETCH_QUERY_PARAMS,
    state: 'draft',
  });
  const postsTab = useTab({ query: 'users', tabs: POSTS_TAB });
  const createPostModal = useModal('create-post');
  const TAB_MAPPER: Record<PostsTab, React.ReactNode> = {
    published: <PostsTable elements={publishedPosts?.blogs || []} />,
    drafts: <PostsTable elements={draftPosts?.blogs || []} />,
  };
  return (
    <div className=' text-primary-text flex flex-col gap-5'>
      <CreatePostModal />
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-dark-100 mb-4 text-[32px]'>Posts</h3>
          <p className='text-base font-medium'>View and manage your posts</p>
        </div>
        <div className='flex gap-6'>
          <div>
            <InputSearch />
          </div>
          <div>
            <Button
              rightIcon={IoMdFunnel}
              className='text-primary-text hover:text-primary-text px-3 py-3'
            >
              Filter
            </Button>
          </div>
          <div>
            <Button
              onClick={() => createPostModal.handleOpenModal()}
              className='text-primary-text hover:text-primary-text px-3 py-3'
            >
              Create post
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Tab {...postsTab} />
      </div>
      <div className='rounded-[5px] bg-white px-6 py-3'>
        {TAB_MAPPER[postsTab.activeTab as PostsTab]}
      </div>
    </div>
  );
};

export default PostsPage;
