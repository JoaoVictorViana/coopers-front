import { TodoItem } from '@/types/app'
import Image from 'next/image'
import { FC, useCallback } from 'react'

type DoneItemProps = {
  task: TodoItem
  onDeleteItem: (id: string) => void
}

export const DoneItem: FC<DoneItemProps> = ({ task, onDeleteItem }) => {
  const handleDeleteItem = useCallback(() => {
    onDeleteItem(task.id)
  }, [task])

  return (
    <div className="TodoList__sortable">
      <Image
        width={24}
        height={24}
        alt="Tarefas completadas"
        src="/images/core/done.png"
      />
      <span className="TodoList__done-text">{task.text}</span>

      <button className="TodoList__sortable-delete" onClick={handleDeleteItem}>
        delete
      </button>
    </div>
  )
}
