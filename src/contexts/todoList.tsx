import { TodoItem } from '@/types/app'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { faker } from '@faker-js/faker'

type Context = {
  todoList: TodoItem[]
  doneList: TodoItem[]
  updateList: (newList: TodoItem[]) => void
  updateDoneList: (newList: TodoItem[]) => void
  addItem: (text: string) => void
  updateItem: (text: string, id: string) => void
  deleteItem: (id: string) => void
  checkItem: (id: string) => void
  eraseAllTodoList: () => void
  eraseAllDoneList: () => void
  deleteDoneItem: (id: string) => void
}

export const TodoListContext = createContext<Context>({
  addItem: () => null,
  deleteItem: () => null,
  doneList: [],
  todoList: [],
  updateItem: () => null,
  updateList: () => null,
  updateDoneList: () => null,
  checkItem: () => null,
  eraseAllDoneList: () => null,
  eraseAllTodoList: () => null,
  deleteDoneItem: () => null,
})

export const useTodoList = () => {
  const context = useContext(TodoListContext)
  return context
}

export const TodoListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [doneList, setDoneList] = useState<TodoItem[]>([])

  const updateList = useCallback((newList: TodoItem[]) => {
    setTodoList(newList)
  }, [])

  const updateDoneList = useCallback((newList: TodoItem[]) => {
    setDoneList(newList.map((item) => ({ ...item, done: true })))
  }, [])

  const addItem = useCallback((text: string) => {
    setTodoList((prev) => [
      ...prev,
      {
        id: faker.datatype.uuid(),
        text,
        done: false,
      },
    ])
  }, [])

  const updateItem = useCallback(
    (text: string, id: string) => {
      const itemIndex = todoList.findIndex((item) => item.id === id)

      if (itemIndex === -1) return

      setTodoList((prev) =>
        prev.map((item, index) =>
          index === itemIndex ? { ...item, text } : item
        )
      )
    },
    [todoList]
  )

  const deleteItem = useCallback(
    (id: string) => {
      const itemIndex = todoList.findIndex((item) => item.id === id)

      if (itemIndex === -1) return

      setTodoList((prev) => [
        ...prev.slice(0, itemIndex),
        ...prev.slice(itemIndex + 1),
      ])
    },
    [todoList]
  )

  const deleteDoneItem = useCallback(
    (id: string) => {
      const itemIndex = doneList.findIndex((item) => item.id === id)

      if (itemIndex === -1) return

      setDoneList((prev) => [
        ...prev.slice(0, itemIndex),
        ...prev.slice(itemIndex + 1),
      ])
    },
    [doneList]
  )

  const checkItem = useCallback(
    (id: string) => {
      const taskIndex = todoList.findIndex((item) => item.id === id)

      if (taskIndex === -1) return

      setDoneList((prev) => [...prev, todoList[taskIndex]])
      setTodoList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, done: true } : item))
      )
    },
    [todoList]
  )

  const eraseAllTodoList = useCallback(() => {
    setDoneList((prev) => [
      ...prev,
      ...todoList.map((item) => ({ ...item, done: true })),
    ])
    setTodoList([])
  }, [todoList])

  const eraseAllDoneList = useCallback(() => {
    setDoneList([])
  }, [todoList])

  const value = useMemo(
    () => ({
      todoList,
      doneList,
      updateList,
      addItem,
      updateItem,
      deleteItem,
      checkItem,
      updateDoneList,
      eraseAllTodoList,
      eraseAllDoneList,
      deleteDoneItem,
    }),
    [
      todoList,
      doneList,
      updateList,
      addItem,
      updateItem,
      deleteItem,
      checkItem,
      updateDoneList,
      eraseAllDoneList,
      eraseAllTodoList,
      deleteDoneItem,
    ]
  )

  useLayoutEffect(() => {
    if (!todoList.some((item) => item.done)) return

    setTodoList((prev) => prev.filter((item) => !item.done))
  }, [todoList])

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  )
}
