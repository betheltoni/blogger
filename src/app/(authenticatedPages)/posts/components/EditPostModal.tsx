'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { useQueryString } from '@/hooks/useQueryString';

import Button from '@/components/buttons/Button';
import { Input, MultiLine } from '@/components/input';
import Modal from '@/components/modal';
import useModal from '@/components/modal/useModal';

import { useGetMyPostsByIdQuery, useUpdateMyPostMutation } from '@/api/posts';
import {
  CREATE_POST_BODY,
  CREATE_POST_DESCRIPTION,
  CREATE_POST_TAGS,
  CREATE_POST_TITLE,
} from '@/app/(authenticatedPages)/posts/utils/constants';
import {
  createPostInitialValues,
  createPostValidationSchema,
} from '@/app/(authenticatedPages)/posts/utils/postValidationSchema';
import { handleErrors } from '@/utils/custom-error';
import { customToast } from '@/utils/toast';

const EditPostModal = () => {
  const editPost = useModal('edit-post');
  const { getQueryString, pathname } = useQueryString();
  const blogId = String(pathname.split('/').pop());
  const { data: post } = useGetMyPostsByIdQuery(blogId as string);
  const defaultTags: string[] = post?.blog?.tags ?? [];
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [submitting, setSubmitting] = useState(false);
  const [updateMyPost] = useUpdateMyPostMutation();
  const router = useRouter();

  useEffect(() => {
    if (post && post.blog && post.blog.tags) {
      setTags(post.blog.tags);
    }
  }, [post]);

  const formik = useFormik({
    initialValues: createPostInitialValues,
    validationSchema: createPostValidationSchema,
    onSubmit: async (values) => {
      //logic here
      setSubmitting(true);
      try {
        await updateMyPost({ _id: blogId, ...values, tags }).unwrap();
        customToast.success('Success', 'blog updated successfully');
        setSubmitting(false);
        editPost.handleCloseModal();
        router.push('/posts');
      } catch (error) {
        handleErrors(error);
        customToast.error('Error', 'Error updating blog');
      } finally {
        setSubmitting(false);
      }
    },
  });

  function getFormikPropsInput(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  }

  const removeTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleAddTag = (newTag: string) => {
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    formik.setFieldValue(CREATE_POST_TAGS, updatedTags);
  };
  return (
    <Modal {...editPost} isOpen={getQueryString('edit-post') === 'true'}>
      <form onSubmit={formik.handleSubmit}>
        <section className='flex flex-col gap-6'>
          <div>
            <Input
              id={CREATE_POST_TITLE}
              type='text'
              label='Title'
              placeholder={post?.blog?.title || 'Enter title'}
              inputClassName='bg-[#F2F4F7]'
              {...getFormikPropsInput(CREATE_POST_TITLE)}
            />
          </div>
          <div>
            <Input
              id={CREATE_POST_DESCRIPTION}
              type='text'
              label='Description'
              placeholder={post?.blog?.description || 'Enter description'}
              inputClassName='bg-[#F2F4F7]'
              {...getFormikPropsInput(CREATE_POST_DESCRIPTION)}
            />
          </div>
          <div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-[14px] font-medium'>
                Tags
              </label>
              <ul className='flex gap-3 '>
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className='border-secondary flex items-center gap-4 rounded-[4px] border-[1.5px] bg-[#F0F9FF] px-3 py-1 text-[14px] font-medium leading-[20px]'
                  >
                    {tag}{' '}
                    <IoIosCloseCircleOutline
                      color='#026AA2'
                      size={20}
                      className='cursor-pointer'
                      onClick={() => removeTag(index)}
                    />{' '}
                  </li>
                ))}
              </ul>
              <input
                name={CREATE_POST_TAGS}
                type='text'
                placeholder='+ Add tags'
                className='border-tertiary-grey rounded-[8px] border bg-[#F2F4F7] py-3'
                onKeyUp={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value !== '') {
                    const newTag = e.currentTarget.value;
                    handleAddTag(newTag);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
          <div>
            <MultiLine
              id={CREATE_POST_BODY}
              label='Body'
              placeholder={post?.blog?.body}
              {...getFormikPropsInput(CREATE_POST_BODY)}
              rows={5}
              inputClassName='bg-[#F2F4F7]'
            />
          </div>
          <div>
            <Button
              isLoading={submitting}
              type='submit'
              className='text-primary-text hover:text-primary-text flex w-full justify-center px-3 py-3'
            >
              Submit
            </Button>
          </div>
        </section>
      </form>
    </Modal>
  );
};

export default EditPostModal;
