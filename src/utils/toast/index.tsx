import toast from 'react-hot-toast';

import CustomToast from './Toast';

export class CustomToastClass {
  success(title: string, message: string) {
    return toast.custom(
      (t) => {
        return (
          <CustomToast
            id={t.id}
            isOpen={t.visible}
            title={title}
            message={message}
            type='success'
          />
        );
      },
      { duration: 1500 }
    );
  }

  error(title: string, message: string) {
    return toast.custom((t) => {
      return (
        <CustomToast
          id={t.id}
          isOpen={t.visible}
          title={title}
          message={message}
          type='error'
        />
      );
    });
  }
}

export const customToast = new CustomToastClass();
