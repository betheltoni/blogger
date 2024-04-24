import { useQueryString } from '@/hooks/useQueryString';

interface IUseTab {
  query?: string;
  tabs: TabArrayProps<string>;
}

// key = 'tab' is the default tab query name.
const useTab = ({ query = 'tab', ...rest }: IUseTab) => {
  const { router, pathname, createQueryString, getQueryString } =
    useQueryString();

  const handleChangeTab = (value: string) => {
    router.push(`${pathname}?${createQueryString(query, value)}`);
  };

  const activeTab = getQueryString(query) || rest.tabs[0].value;

  return {
    activeTab,
    handleChangeTab,
    ...rest,
  };
};

export default useTab;
