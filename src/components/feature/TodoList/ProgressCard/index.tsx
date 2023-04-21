import { ReactSortable } from 'react-sortablejs'
import { KeyboardEvent, useCallback, useRef } from 'react'
import { useTodoList } from '@/contexts/todoList'
import { KEYCODES, KEYENTERCODE } from '@/configs/contants'
import { SortableItem } from './Item'

export const ProgressCard = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    addItem,
    deleteItem,
    todoList,
    updateItem,
    updateList,
    checkItem,
    eraseAllTodoList,
  } = useTodoList()

  const handleAddNewItem = useCallback(() => {
    if (!inputRef.current) return
    if (!inputRef.current.value) return

    const text = inputRef.current.value

    addItem(text)

    inputRef.current.value = ''
  }, [inputRef.current, addItem])

  const handleNewKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === KEYCODES.ESCAPE && inputRef.current) {
        inputRef.current.value = ''
        return
      }

      if (!KEYENTERCODE.includes(e.code)) return

      handleAddNewItem()
    },
    [handleAddNewItem]
  )

  return (
    <div className="TodoList__card TodoList__card--progress">
      <h3 className="TodoList__card-title">To-do</h3>
      <span className="TodoList__card-description">Take a breath.</span>
      <span className="TodoList__card-description">Start doing.</span>

      <div className="TodoList__card-list">
        <ReactSortable
          group={{
            name: 'shared',
          }}
          filter=".RadioInput"
          list={todoList}
          setList={updateList}
        >
          {todoList.map((item) => (
            <SortableItem
              key={`sortable-item-key-${item.id}`}
              task={item}
              onChangeText={updateItem}
              onDeleteItem={deleteItem}
              onCheck={checkItem}
            />
          ))}
        </ReactSortable>
      </div>

      <div className="TodoList__card-new">
        <input
          ref={inputRef}
          className="TodoList__sortable-input"
          placeholder="Add new task..."
          onBlur={handleAddNewItem}
          onKeyUp={handleNewKeyUp}
        />
      </div>

      <button className="TodoList__card-button" onClick={eraseAllTodoList}>
        erase all
      </button>
    </div>
  )
}
