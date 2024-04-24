export const POSTS_TAB: TabArrayProps<PostsTab> = [
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'drafts' },
];

export const CREATE_POST_TITLE = 'title' as const;
export const CREATE_POST_DESCRIPTION = 'description' as const;
export const CREATE_POST_TAGS = 'tags' as const;
export const CREATE_POST_BODY = 'body' as const;
