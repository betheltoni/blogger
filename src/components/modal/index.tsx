'use client';

import { useId } from 'react';
import ReactModal from 'react-modal';

import ModalActionButton from '@/components/modal/modal-action-button';
import ModalContent from '@/components/modal/modal-content';

const CUSTOM_STYLES: ReactModal.Styles = {
  content: {
    width: 'max-content',
    maxWidth: 800,
    minWidth: 500,
    maxHeight: '95vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'white',
  },
  overlay: { backgroundColor: 'rgb(25, 27, 31, .5)' },
};

ReactModal.setAppElement('body');

export { ModalActionButton, ModalContent };

export interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: (value?: string) => void;
}

interface IModal extends React.PropsWithChildren, ModalProps {
  title?: string;
  subtitle?: string;
  onAfterClose?: () => void;
}

const Modal: React.FC<IModal> = ({
  title,
  subtitle,
  isOpen,
  children,
  handleCloseModal,
  onAfterClose,
}) => {
  const id = useId();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={CUSTOM_STYLES}
      portalClassName={id}
      contentLabel={title}
      onAfterClose={onAfterClose}
      // ariaHideApp={false}
    >
      <div className='p-px md:p-2'>
        {title || subtitle ? (
          <div className='mb-6 space-y-2'>
            <h3 className='font-medium'>{title}</h3>
            <p className='text-sm'>{subtitle}</p>
          </div>
        ) : null}
        <div className='overflow-y-auto'>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
