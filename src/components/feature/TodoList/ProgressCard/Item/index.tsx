import { RadioInput } from '@/components/core/Inputs/Radio'
import { KEYCODES, KEYENTERCODE } from '@/configs/contants'
import { TodoItem } from '@/types/app'
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

type SortableItemProps = {
  task: TodoItem
  onChangeText: (text: string, id: string) => void
  onDeleteItem: (id: string) => void
  onCheck: (id: string) => void
}

const KEYS_TO_ESCAPE = [KEYCODES.ESCAPE, ...KEYENTERCODE]

export const SortableItem: FC<SortableItemProps> = memo(
  ({ task, onChangeText, onDeleteItem, onCheck }) => {
    const [checked, setChecked] = useState(false)
    const [mode, setMode] = useState<'read' | 'edit'>('read')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChecked = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        setChecked((prev) => !prev)
        onCheck(task.id)
      },
      [task]
    )

    const handleChangeText = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText(e.target.value, task.id)
      },
      [task]
    )

    const handleChangeMode = useCallback(
      () => setMode((prev) => (prev === 'read' ? 'edit' : 'read')),
      []
    )

    const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (!KEYS_TO_ESCAPE.includes(e.code)) return
      e.stopPropagation()

      setMode('read')
    }, [])

    const handleDelete = useCallback(() => {
      onDeleteItem(task.id)
    }, [task])

    useEffect(() => {
      if (!inputRef.current) return

      inputRef.current.focus()
    }, [inputRef.current, mode])

    return (
      <div className="TodoList__sortable">
        <RadioInput
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChecked}
        />
        {mode === 'read' && (
          <span
            role="button"
            tabIndex={0}
            onKeyDown={handleChangeMode}
            className="TodoList__sortable-text"
            onClick={handleChangeMode}
          >
            {task.text}
          </span>
        )}
        {mode === 'edit' && (
          <input
            ref={inputRef}
            name="sortableItemText"
            className="TodoList__sortable-input"
            value={task.text}
            onKeyDown={handleKeyPress}
            onBlur={handleChangeMode}
            onChange={handleChangeText}
          />
        )}
        <button className="TodoList__sortable-delete" onClick={handleDelete}>
          delete
        </button>
      </div>
    )
  }
)
