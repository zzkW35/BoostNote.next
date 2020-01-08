import React, { useMemo } from 'react'
import SideNavigatorItem from '../molecules/NavigatorItem'
import { NoteStorage } from '../../../common/db/types'
import { useGeneralStatus } from '../../lib/generalStatus'
import { getTagListItemId } from '../../../common/nav'
import { useRouter, usePathnameWithoutNoteId } from '../../lib/router'
import { IconTag, IconTags, IconTagFill } from '../../../common/icons'
import { useTranslation } from 'react-i18next'

interface TagListFragmentProps {
  storage: NoteStorage
}

const TagListFragment = ({ storage }: TagListFragmentProps) => {
  const { toggleSideNavOpenedItem, sideNavOpenedItemSet } = useGeneralStatus()
  const { id: storageId, tagMap } = storage
  const { push } = useRouter()
  const { t } = useTranslation()
  const currentPathname = usePathnameWithoutNoteId()

  const tagListNavItemId = getTagListItemId(storage.id)
  const tagListIsFolded = !sideNavOpenedItemSet.has(tagListNavItemId)

  const tagList = useMemo(() => {
    return Object.keys(tagMap).map(tagName => {
      const tagPathname = `/app/storages/${storageId}/tags/${tagName}`
      const tagIsActive = currentPathname === tagPathname
      return (
        <SideNavigatorItem
          key={`storage:${storageId}/tags:${tagName}`}
          depth={2}
          icon={tagIsActive ? <IconTagFill size='1.4em' /> : <IconTag />}
          label={tagName}
          onClick={() => {
            push(tagPathname)
          }}
          active={tagIsActive}
        />
      )
    })
  }, [storageId, tagMap, push, currentPathname])

  return (
    <>
      <SideNavigatorItem
        depth={1}
        icon={<IconTags size='1.5em' />}
        label={t('tag.tag')}
        folded={tagList.length > 0 ? tagListIsFolded : undefined}
        onFoldButtonClick={() => {
          toggleSideNavOpenedItem(tagListNavItemId)
        }}
        onContextMenu={event => {
          event.preventDefault()
        }}
      />
      {!tagListIsFolded && tagList}
    </>
  )
}

export default TagListFragment
