'use client';
import React from 'react';

import { useQueryString } from '@/hooks/useQueryString';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal';
import useModal from '@/components/modal/useModal';

const PublishPostModal = () => {
  const publishPost = useModal('publish-post');
  const { getQueryString } = useQueryString();
  return (
    <Modal {...publishPost} isOpen={getQueryString('publish-post') === 'true'}>
      <section className='my-3 flex flex-col gap-5 px-6'>
        <div className='text-center'>
          <h3 className='text-[#0C1D12]p my-3 text-[24px] font-bold'>
            Publish Post
          </h3>
          <p className='text-[#14241C]'>
            Are you sure you want to publish this post?
          </p>
        </div>
        <div className=' flex gap-4'>
          <Button
            onClick={() => publishPost.handleCloseModal()}
            className='border-primary-100 text-primary-100 hover:text-primary-100 active:text-primary-100 flex w-full justify-center  bg-transparent px-6 py-3 hover:bg-transparent active:bg-transparent'
          >
            Back
          </Button>
          <Button className='bg-primary-100 hover:bg-primary-100 active:bg-primary-100 flex w-full justify-center  px-6 py-3 text-white hover:text-white active:text-white'>
            Publish
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default PublishPostModal;
