'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

import { useQueryString } from '@/hooks/useQueryString';

import Button from '@/components/buttons/Button';
import useModal from '@/components/modal/useModal';

import { useGetMyPostsByIdQuery } from '@/api/posts';
import DeletePostModal from '@/app/(authenticatedPages)/posts/components/DeletePostModal';
import EditPostModal from '@/app/(authenticatedPages)/posts/components/EditPostModal';
import PublishPostModal from '@/app/(authenticatedPages)/posts/components/PublishPostModal';

const PostDetailsPage = () => {
  const publishPost = useModal('publish-post');
  const editPost = useModal('edit-post');
  const deletePost = useModal('delete-post');
  const { pathname } = useQueryString();
  const router = useRouter();
  const blogId = String(pathname.split('/').pop());
  const { data: post } = useGetMyPostsByIdQuery(blogId as string);

  return (
    <section className='flex flex-col gap-6'>
      <DeletePostModal />
      <PublishPostModal />
      <EditPostModal />
      <div className='flex items-center justify-between'>
        <div
          className='flex items-center gap-5'
          onClick={() => router.push('/posts')}
        >
          <div className='bg-primary-100/20 cursor-pointer rounded-sm p-4'>
            <IoMdArrowBack />
          </div>
          <p className='text-[20px] capitalize'>{post?.blog?.state}</p>
        </div>
        <div className='flex justify-end gap-5'>
          {post?.blog?.state === 'draft' && (
            <div>
              <Button
                onClick={() => publishPost.handleOpenModal()}
                className='text-primary-text hover:text-primary-text flex w-[100px] justify-center px-3 py-3 text-center'
              >
                Publish
              </Button>
            </div>
          )}
          <div>
            <Button
              onClick={() => editPost.handleOpenModal()}
              className='text-primary-text hover:text-primary-text flex w-[100px] justify-center px-3 py-3 text-center'
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              onClick={() => deletePost.handleOpenModal()}
              className='text-primary-text hover:text-primary-text flex w-[100px] justify-center px-3 py-3 text-center'
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      {post && (
        <div className=' text-primary-text flex flex-col gap-5'>
          <h3 className='text-dark-100 mb-4 text-[32px]'>
            {post?.blog?.title}
          </h3>
          <section className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='text-base font-medium'>{post?.blog?.description}</p>
              <div className='flex gap-2'>
                {post?.blog?.tags.map((tag, index) => (
                  <p
                    key={index}
                    className='bg-primary-100/20 rounded-sm px-2 text-base font-medium'
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <div className='flex gap-5'>
              <p className='text-base font-medium'>Time stamp</p>
              {post && post?.blog?.read_count > 1 ? (
                <p className='text-base font-medium'>
                  {post?.blog?.read_count} reads
                </p>
              ) : (
                <p className='text-base font-medium'>
                  {post?.blog?.read_count} read
                </p>
              )}
              {post && post?.blog?.reading_time > 1 ? (
                <p className='text-base font-medium'>
                  {post?.blog?.reading_time} minutes
                </p>
              ) : (
                <p className='text-base font-medium'>
                  {post?.blog?.reading_time} minute
                </p>
              )}
            </div>
          </section>
          <section>
            <p className='text-base leading-[32px]'>{post?.blog?.body}</p>
          </section>
          <section>
            <p className='text-base font-medium'>Author</p>
            <p className='text-base font-medium'>
              {post?.blog?.author?.first_name} {post?.blog?.author?.last_name}.
            </p>
          </section>
        </div>
      )}
    </section>
  );
};

export default PostDetailsPage;
