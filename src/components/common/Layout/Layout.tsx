import React, { FC, ReactNode } from 'react';
import s from './Layout.module.css';
import Modal from '@components/ui/Modal';
import { UIProvider, useUI } from '../../ui/context';
import SelectTokenView from '../../swap/SelectTokenView/SelectTokenView';
import { SwapTokenProvider } from '@components/swap/context';

const ModalView: React.FC<{ modalView: string; closeModal: () => void }> = ({ modalView, closeModal }) => {
  return <Modal onClose={closeModal}>{modalView === 'SELECT_TOKEN_VIEW' && <SelectTokenView />}</Modal>;
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView modalView={modalView} closeModal={closeModal} /> : null;
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <SwapTokenProvider>
        <div className={s.root}>
          <main className={s.main}>{children}</main>
          <ModalUI />
        </div>
      </SwapTokenProvider>
    </UIProvider>
  );
};

export default Layout;
