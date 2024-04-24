'use client';
import React from 'react';
import { IoMdFunnel } from 'react-icons/io';

import Button from '@/components/buttons/Button';
import { InputSearch } from '@/components/input';
import useModal from '@/components/modal/useModal';
import Tab from '@/components/tab';
import useTab from '@/components/tab/useTab';

import CreatePostModal from '@/app/(authenticatedPages)/posts/components/CreatePostModal';
import PostsTable from '@/app/(authenticatedPages)/posts/components/PostsTable';
import { POSTS_TAB } from '@/app/(authenticatedPages)/posts/utils/constants';

const PostsPage = () => {
  const postsTab = useTab({ query: 'users', tabs: POSTS_TAB });
  const createPostModal = useModal('create-post');
  const TAB_MAPPER: Record<PostsTab, React.ReactNode> = {
    published: (
      <PostsTable
        elements={new Array(10).fill({
          title: 'Test Title',
          description: 'Test Description',
          author: 'Test Author',
          state: 'Published',
          read_count: 0,
          reading_time: 0,
          tags: ['tag1', 'tag2'],
          body: 'Test Body',
          timeStamp: '2022-01-01',
        })}
      />
    ),
    drafts: (
      <PostsTable
        elements={new Array(10).fill({
          title: 'Test Title',
          description: 'Test Description',
          author: 'Test Author',
          state: 'Drafts',
          read_count: 0,
          reading_time: 0,
          tags: ['tag1', 'tag2'],
          body: 'Test Body',
          timeStamp: '2022-01-01',
        })}
      />
    ),
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
