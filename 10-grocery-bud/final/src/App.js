import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');  //getItem is a localStorage method
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list'))); //'list' -the same name on the key 
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());   //initially it was an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };  //editID will remain the same, but title will e equal to name
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
    //show:show, type: type.......this function is just restoring the state
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id)); //returns item whose id did not match
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id); //returns item whose id matches
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list)); //'list' - the first argument is a name for a key value pair
  }, [list]);   //this only sets the item to the localStorage, it does not actually save it to the local storage
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        {/* Alert passes in the properties of the state values */}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
