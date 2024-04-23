import { Variants } from 'framer-motion';

export const toastVariant: Variants = {
  initial: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};
