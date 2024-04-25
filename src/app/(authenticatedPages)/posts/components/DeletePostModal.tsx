'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useQueryString } from '@/hooks/useQueryString';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal';
import useModal from '@/components/modal/useModal';

import { useDeleteMyPostMutation } from '@/api/posts';

const DeletePostModal = () => {
  const deletePost = useModal('delete-post');
  const { getQueryString, pathname } = useQueryString();
  const [deleteMyPost] = useDeleteMyPostMutation();
  const blogId = String(pathname.split('/').pop());
  const router = useRouter();
  return (
    <Modal {...deletePost} isOpen={getQueryString('delete-post') === 'true'}>
      <section className='my-3 flex flex-col gap-5 px-6'>
        <div className='text-center'>
          <h3 className='text-[#0C1D12]p my-3 text-[24px] font-bold'>
            Delete Post
          </h3>
          <p className='text-[#14241C]'>
            Are you sure you want to delete this post?
          </p>
        </div>
        <div className=' flex gap-4'>
          <Button
            onClick={() => deletePost.handleCloseModal()}
            className='border-primary-100 text-primary-100 hover:text-primary-100 active:text-primary-100 flex w-full justify-center  bg-transparent px-6 py-3 hover:bg-transparent active:bg-transparent'
          >
            Back
          </Button>
          <Button
            onClick={() => {
              deleteMyPost(blogId);
              deletePost.handleCloseModal();
              router.push('/posts');
            }}
            className='flex w-full justify-center bg-[#F41818] px-6 py-3  text-white hover:bg-[#F41818] hover:text-white active:bg-[#F41818] active:text-white'
          >
            Delete
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default DeletePostModal;
