import { useTodoList } from '@/contexts/todoList'
import { ReactSortable } from 'react-sortablejs'
import { useMemo } from 'react'
import { DoneItem } from './Item'

export const DoneCard = () => {
  const { doneList, deleteDoneItem, eraseAllDoneList, updateDoneList } =
    useTodoList()

  const label = useMemo(() => {
    if (!doneList.length) return 'No finished tasks.'

    if (doneList.length === 1) return 'You have done 1 task'

    return `You have done ${doneList.length} tasks`
  }, [doneList])

  return (
    <div className="TodoList__card TodoList__card--done">
      <h3 className="TodoList__card-title">Done</h3>
      {doneList.length > 1 && (
        <span className="TodoList__card-description">Congratulions!</span>
      )}
      <span className="TodoList__card-description TodoList__card-description--bold">
        {label}
      </span>

      <div className="TodoList__card-list">
        <ReactSortable
          list={doneList}
          setList={updateDoneList}
          group={{ name: 'shared' }}
          style={{ height: '100%' }}
          filter=".TodoList__sortable"
        >
          {doneList.map((item) => (
            <DoneItem key={item.id} onDeleteItem={deleteDoneItem} task={item} />
          ))}
        </ReactSortable>
      </div>

      <button className="TodoList__card-button" onClick={eraseAllDoneList}>
        erase all
      </button>
    </div>
  )
}
