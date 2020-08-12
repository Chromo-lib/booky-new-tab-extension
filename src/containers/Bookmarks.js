import React, { useState, useEffect } from 'react';
import LocalBookmarks from '../utils/LocalBookmarks';
import Card from '../components/Card';
import Modal from '../components/Modal';
import AddOrUpdateBookmark from './AddOrUpdateBookmark';

import placeImg from '../assets/plus.png';

export default function Bookmarks () {

  const [bookmarks, setBookmarks] = useState(LocalBookmarks.getAll());
  const [bookmark, setBookmark] = useState(null);
  const [bkAction, setBkAction] = useState('add');
  const [showModal, setShowModal] = useState(false);
  const [ctxMenu, setCtxMenu] = useState({ show: false, id: 0 });

  const onUpdateBookmark = (bk) => {
    setBkAction('update');
    setBookmark(bk);
    setShowModal(!showModal);
  }

  const onRemoveBookmarks = (bk) => {
    let c = window.confirm("Are you sure you wish to delete this item? " + bk.title);
    if (c) {
      LocalBookmarks.remove(bk.id);
      setBookmarks(LocalBookmarks.getAll());
    }
  }

  const onShowModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    setBookmarks(LocalBookmarks.getAll());
  }, [showModal]);

  useEffect(() => {
    let selectedIdx = 0;
    let replacedElementIndex = 0;
    let replacedElementElement = null;
    const listCards = Array.from(document.querySelectorAll('.card-cover'));

    const dragStart = (e) => {
      e.dataTransfer.dropEffect = "move";
      selectedIdx = +e.target.id;
    }

    const dragOver = (e) => {
      e.preventDefault();
      replacedElementIndex = +e.target.id;
      replacedElementElement = e.target;
      e.target.parentNode.classList.add('bg-trans');
    }

    const dragEnd = (e) => {
      e.preventDefault();
      let bbb = bookmarks.slice(0);

      let tmp = bbb[replacedElementIndex];
      bbb[replacedElementIndex] = bbb[selectedIdx];
      bbb[selectedIdx] = tmp;

      LocalBookmarks.replace(bbb);
      setBookmarks(bbb);

      listCards.forEach(el => {
        el.parentNode.classList.remove('bg-trans')
      });
    }

    listCards.forEach(el => {
      el.addEventListener('dragstart', dragStart, false);
      el.addEventListener('dragover', dragOver, false);
      el.addEventListener('dragend', dragEnd, false);
    });

    return () => {
      listCards.forEach(el => {
        el.removeEventListener('dragstart', dragStart);
        el.removeEventListener('dragover', dragOver);
        el.removeEventListener('dragend', dragEnd);
      });
    }
  }, [bookmarks]);

  return (
    <div className="d-flex">

      <div id="list-cards" className="w-100 d-flex">
        {bookmarks.map((b, idx) => <div key={b.id} className="card-container">
          <div className="card-cover" id={idx} draggable={true}></div>
          <Card id={b.id} title={b.title} url={b.url} />

          <span className="btn-context-menu" onClick={() => { setCtxMenu({ id: b.id, show: !ctxMenu.show }) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="#fff" d="M2 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm6 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm6 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
            </svg>
          </span>

          <div className="context-menu" style={{ display: ctxMenu.show && ctxMenu.id === b.id ? 'block' : 'none' }}>
            <ul className="txt-uppercase lsp2">
              <li className="d-flex justify-left" onClick={() => { onUpdateBookmark(b) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#fff" d="M14.354 2.353l-.708-.707a2.007 2.007 0 0 0-2.828 0l-.379.379a.5.5 0 0 0 0 .707l2.829 2.829a.5.5 0 0 0 .707 0l.379-.379a2.008 2.008 0 0 0 0-2.829zM9.732 3.439a.5.5 0 0 0-.707 0L3.246 9.218a1.986 1.986 0 0 0-.452.712l-1.756 4.39A.5.5 0 0 0 1.5 15a.5.5 0 0 0 .188-.037l4.382-1.752a1.966 1.966 0 0 0 .716-.454l5.779-5.778a.5.5 0 0 0 0-.707zM5.161 12.5l-2.549 1.02a.1.1 0 0 1-.13-.13L3.5 10.831a.1.1 0 0 1 .16-.031l1.54 1.535a.1.1 0 0 1-.039.165z" /></svg><span className="ml-10">edit</span></li>
              <hr />
              <li className="d-flex justify-left" onClick={() => { onRemoveBookmarks(b) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" /></svg><span className="ml-10">remove</span></li>
              <li className="d-flex justify-left" onClick={() => { setCtxMenu({ id: b.id, show: !ctxMenu.show }) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#fff" d="M9.414 8l3.531-3.531a1 1 0 1 0-1.414-1.414L8 6.586 4.469 3.055a1 1 0 1 0-1.414 1.414L6.586 8l-3.531 3.531a1 1 0 1 0 1.414 1.414L8 9.414l3.531 3.531a1 1 0 1 0 1.414-1.414z" /></svg><span className="ml-10">dismiss</span></li>
            </ul>
          </div>

        </div>)}

        <div className="h-100 card d-flex-col" onClick={onShowModal}>
          <img src={placeImg} alt="" />
          <span>{'+'}</span>
        </div>
      </div>

      {showModal
        && <Modal>
          <AddOrUpdateBookmark
            bookmark={bookmark}
            bkAction={bkAction}
            setShowModal={setShowModal}
            onClick={() => {
              setBookmark(null);
              setBkAction('add');
              onShowModal();
            }}
          />
        </Modal>}
    </div>
  );
}
