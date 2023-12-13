import {
  Box,
  Button,
  Fade,
  Flex,
  IconButton,
  SlideFade,
  Stack,
} from '@chakra-ui/react'
import { TrashIcon, PlusIcon } from '@/components/icons'
import { createId } from '@paralleldrive/cuid2'
import React, { useEffect, useState } from 'react'

const defaultItem = {
  id: createId(),
}

type ItemWithId<T> = T & { id: string }

export type TableListItemProps<T> = {
  item: T
  onItemChange: (item: T) => void
}

type Props<T> = {
  initialItems?: ItemWithId<T>[]
  isOrdered?: boolean
  addLabel?: string
  newItemDefaultProps?: Partial<T>
  hasDefaultItem?: boolean
  ComponentBetweenItems?: (props: unknown) => JSX.Element
  onItemsChange: (items: ItemWithId<T>[]) => void
  children: (props: TableListItemProps<T>) => JSX.Element
}

export const TableList = <T,>({
  initialItems,
  isOrdered,
  addLabel = 'Add',
  newItemDefaultProps,
  hasDefaultItem,
  children,
  ComponentBetweenItems,
  onItemsChange,
}: Props<T>) => {
  const [items, setItems] = useState(
    initialItems ?? (hasDefaultItem ? ([defaultItem] as ItemWithId<T>[]) : [])
  )
  const [showDeleteIndex, setShowDeleteIndex] = useState<number | null>(null)

  useEffect(() => {
    if (items.length && initialItems && initialItems?.length === 0)
      setItems(initialItems)
  }, [initialItems, items.length])

  const createItem = () => {
    const id = createId()
    const newItem = { id, ...newItemDefaultProps } as ItemWithId<T>
    setItems([...items, newItem])
    onItemsChange([...items, newItem])
  }

  const insertItem = (itemIndex: number) => () => {
    const id = createId()
    const newItem = { id } as ItemWithId<T>
    const newItems = [...items]
    newItems.splice(itemIndex + 1, 0, newItem)
    setItems(newItems)
    onItemsChange(newItems)
  }

  const updateItem = (itemIndex: number, updates: Partial<T>) => {
    const newItems = items.map((item, idx) =>
      idx === itemIndex ? { ...item, ...updates } : item
    )
    setItems(newItems)
    onItemsChange(newItems)
  }

  const deleteItem = (itemIndex: number) => () => {
    const newItems = [...items]
    newItems.splice(itemIndex, 1)
    setItems([...newItems])
    onItemsChange([...newItems])
  }

  const handleMouseEnter = (itemIndex: number) => () =>
    setShowDeleteIndex(itemIndex)

  const handleCellChange = (itemIndex: number) => (item: T) =>
    updateItem(itemIndex, item)

  const handleMouseLeave = () => setShowDeleteIndex(null)

  return (
    <Stack spacing={0}>
      {items.map((item, itemIndex) => (
        <Box key={item.id}>
          {itemIndex !== 0 && ComponentBetweenItems && (
            <ComponentBetweenItems />
          )}
          <Flex
            pos="relative"
            onMouseEnter={handleMouseEnter(itemIndex)}
            onMouseLeave={handleMouseLeave}
            mt={itemIndex !== 0 && ComponentBetweenItems ? 4 : 0}
            justifyContent="center"
            pb="4"
          >
            {children({ item, onItemChange: handleCellChange(itemIndex) })}
            <Fade
              in={showDeleteIndex === itemIndex}
              style={{
                position: 'absolute',
                left: '-15px',
                top: '-15px',
              }}
              unmountOnExit
            >
              <IconButton
                icon={<TrashIcon />}
                aria-label="Remove cell"
                onClick={deleteItem(itemIndex)}
                size="sm"
                shadow="md"
              />
            </Fade>
            {isOrdered && (
              <>
                {itemIndex === 0 && (
                  <SlideFade
                    offsetY="-5px"
                    in={showDeleteIndex === itemIndex}
                    style={{
                      position: 'absolute',
                      top: '-15px',
                    }}
                    unmountOnExit
                  >
                    <IconButton
                      aria-label={addLabel}
                      icon={<PlusIcon />}
                      size="xs"
                      shadow="md"
                      colorScheme="blue"
                      onClick={insertItem(itemIndex - 1)}
                    />
                  </SlideFade>
                )}
                <SlideFade
                  offsetY="5px"
                  in={showDeleteIndex === itemIndex}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                  }}
                  unmountOnExit
                >
                  <IconButton
                    aria-label={addLabel}
                    icon={<PlusIcon />}
                    size="xs"
                    shadow="md"
                    colorScheme="blue"
                    onClick={insertItem(itemIndex)}
                  />
                </SlideFade>
              </>
            )}
          </Flex>
        </Box>
      ))}
      {(!isOrdered || items.length === 0) && (
        <Button
          leftIcon={<PlusIcon />}
          onClick={createItem}
          flexShrink={0}
          colorScheme="blue"
        >
          {addLabel}
        </Button>
      )}
    </Stack>
  )
}
