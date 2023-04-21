import Image from 'next/image'
import { TodoListProvider } from '@/contexts/todoList'
import { DoneCard } from './DoneCard'
import { ProgressCard } from './ProgressCard'

export const TodoList = () => {
  return (
    <section className="TodoList" id="todoList">
      <Image
        className="TodoList__image"
        src="/images/todolist.png"
        width={550}
        height={632}
        alt="To-do list background"
      />
      <TodoListProvider>
        <ProgressCard />
        <DoneCard />
      </TodoListProvider>
    </section>
  )
}
