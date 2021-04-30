import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button';

interface ModalAction {
  action: () => void;
  title: string;
  type: 'secondary' | 'primary';
}

export const Modal: React.FC<{
  isOpen: boolean;
  title: string;
  actions?: ModalAction[];
  onClose: () => void;
}> = (props) => {
  const { isOpen, title, children, onClose, actions } = props;

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? '' : 'pointer-events-none opacity-0'
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 bg-gray-500 transition-opacity ${
            isOpen ? 'bg-opacity-75' : 'bg-opacity-0'
          }`}
          aria-hidden="true"
          onClick={onClose}
        />
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isOpen
              ? 'overflow-x-hidden overflow-y-auto'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2">{children}</div>
            </div>
          </div>
          {actions && (
            <div className="bg-gray-50 px-2 py-1 flex flex-row-reverse">
              {actions.map((a, i) => {
                const Button =
                  a.type === 'secondary' ? SecondaryButton : PrimaryButton;
                return (
                  <div key={i} className="mx-1">
                    <Button onClick={a.action}>{a.title}</Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
