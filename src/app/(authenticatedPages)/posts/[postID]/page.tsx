'use client';
import React from 'react';

import Button from '@/components/buttons/Button';
import useModal from '@/components/modal/useModal';

import DeletePostModal from '@/app/(authenticatedPages)/posts/components/DeletePostModal';
import EditPostModal from '@/app/(authenticatedPages)/posts/components/EditPostModal';
import PublishPostModal from '@/app/(authenticatedPages)/posts/components/PublishPostModal';

const PostDetailsPage = () => {
  const publishPost = useModal('publish-post');
  const editPost = useModal('edit-post');
  const deletePost = useModal('delete-post');
  return (
    <section>
      <DeletePostModal />
      <PublishPostModal />
      <EditPostModal />
      <div className='flex justify-end gap-5'>
        <div>
          <Button
            onClick={() => publishPost.handleOpenModal()}
            className='text-primary-text hover:text-primary-text flex w-[100px] justify-center px-3 py-3 text-center'
          >
            Publish
          </Button>
        </div>
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
      <div className=' text-primary-text flex flex-col gap-5'>
        <h3 className='text-dark-100 mb-4 text-[32px]'>Title</h3>
        <section className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-medium'>Description</p>
            <div className='flex gap-2'>
              <p className='bg-primary-100/20 rounded-sm px-2 text-base font-medium'>
                tag1
              </p>
              <p className='bg-primary-100/20 rounded-sm px-2 text-base font-medium'>
                tag2
              </p>
            </div>
          </div>
          <div className='flex gap-5'>
            <p className='text-base font-medium'>Time stamp</p>
            <p className='text-base font-medium'>Read count</p>
            <p className='text-base font-medium'>Reading time</p>
          </div>
        </section>
        <section>
          <p className='text-base'>Body</p>
        </section>
      </div>
    </section>
  );
};

export default PostDetailsPage;
