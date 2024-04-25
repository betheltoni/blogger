'use client';
import React, { useEffect } from 'react';
import { ImFilesEmpty } from 'react-icons/im';
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
  const { data: publishedPosts, refetch: refetchPublishedPosts } =
    useGetMyPostsQuery(DEFAULT_FETCH_QUERY_PARAMS);
  const { data: draftPosts, refetch: refetchDraftPosts } = useGetMyPostsQuery({
    ...DEFAULT_FETCH_QUERY_PARAMS,
    state: 'draft',
  });
  const postsTab = useTab({ query: 'users', tabs: POSTS_TAB });
  const createPostModal = useModal('create-post');
  const TAB_MAPPER: Record<PostsTab, React.ReactNode> = {
    published: (
      <div>
        {publishedPosts && publishedPosts?.blogs?.length > 0 ? (
          <PostsTable elements={publishedPosts?.blogs || []} />
        ) : (
          <div className='my-28 flex flex-col items-center justify-center'>
            <div className='bg-primary-100/20 text-primary-100 rounded-full p-4 text-3xl'>
              <ImFilesEmpty />
            </div>
            <p className='text-center font-semibold'>No published posts yet</p>
            <Button
              onClick={() => createPostModal.handleOpenModal()}
              className='text-primary-text hover:text-primary-text mt-5 px-3 py-3'
            >
              Create Post
            </Button>
          </div>
        )}
      </div>
    ),
    drafts: (
      <div>
        {draftPosts && draftPosts?.blogs?.length > 0 ? (
          <PostsTable elements={draftPosts?.blogs || []} />
        ) : (
          <div className='my-28 flex flex-col items-center justify-center gap-4'>
            <div className='bg-primary-100/20 text-primary-100 rounded-full p-4 text-3xl'>
              <ImFilesEmpty />
            </div>
            <p className='text-center font-semibold'>No draft posts yet</p>
            <Button
              onClick={() => createPostModal.handleOpenModal()}
              className='text-primary-text hover:text-primary-text mt-5 px-3 py-3'
            >
              Create Post
            </Button>
          </div>
        )}
      </div>
    ),
  };
  useEffect(() => {
    if (postsTab.activeTab === 'published') {
      refetchPublishedPosts();
    }
    if (postsTab.activeTab === 'drafts') {
      refetchDraftPosts();
    }
  }, [postsTab.activeTab, refetchDraftPosts, refetchPublishedPosts]);
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
