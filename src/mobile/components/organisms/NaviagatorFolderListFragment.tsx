import React, { useMemo } from 'react'
import SideNavigatorItem from '../molecules/NavigatorItem'
import { NoteStorage } from '../../../common/db/types'
import { usePathnameWithoutNoteId, useRouter } from '../../lib/router'
import { useGeneralStatus } from '../../lib/generalStatus'
import ControlButton from '../atoms/NaviagtorControlButton'
import { getFolderItemId } from '../../../common/nav'
import { IconFileOpen, IconFile, IconAddRound } from '../../../common/icons'

interface FolderListFragmentProps {
  storage: NoteStorage
  showPromptToCreateFolder: (folderPathname: string) => void
  showPromptToRenameFolder: (folderPathname: string) => void
}

const FolderListFragment = ({
  storage,
  showPromptToCreateFolder,
  showPromptToRenameFolder
}: FolderListFragmentProps) => {
  const { push } = useRouter()

  const { folderMap, id: storageId } = storage

  const { toggleSideNavOpenedItem, sideNavOpenedItemSet } = useGeneralStatus()

  const currentPathnameWithoutNoteId = usePathnameWithoutNoteId()

  const folderPathnames = useMemo(() => {
    return Object.keys(folderMap).sort((a, b) => a.localeCompare(b))
  }, [folderMap])

  const createOnFolderItemClickHandler = (folderPathname: string) => {
    return () => {
      push(
        `/app/storages/${storage.id}/notes${
          folderPathname === '/' ? '' : folderPathname
        }`
      )
    }
  }

  const folderSetWithSubFolders = useMemo(() => {
    return folderPathnames.reduce((folderSet, folderPathname) => {
      if (folderPathname !== '/') {
        const nameElements = folderPathname.slice(1).split('/')
        const parentFolderPathname =
          '/' + nameElements.slice(0, nameElements.length - 1).join('/')
        folderSet.add(parentFolderPathname)
      }
      return folderSet
    }, new Set())
  }, [folderPathnames])

  const openedFolderPathnameList = useMemo(() => {
    const tree = getFolderNameElementTree(folderPathnames)
    return getOpenedFolderPathnameList(
      tree,
      storageId,
      sideNavOpenedItemSet,
      '/'
    )
  }, [folderPathnames, storageId, sideNavOpenedItemSet])

  return (
    <>
      {openedFolderPathnameList.map((folderPathname: string) => {
        const nameElements = folderPathname.split('/').slice(1)
        const folderName = nameElements[nameElements.length - 1]
        const itemId = getFolderItemId(storageId, folderPathname)
        const depth = nameElements.length
        const folded = folderSetWithSubFolders.has(folderPathname)
          ? !sideNavOpenedItemSet.has(itemId)
          : undefined

        const folderIsActive =
          currentPathnameWithoutNoteId ===
          `/app/storages/${storageId}/notes${folderPathname}`
        return (
          <SideNavigatorItem
            key={itemId}
            folded={folded}
            depth={depth}
            active={folderIsActive}
            icon={folderIsActive ? <IconFileOpen size='1.3em' /> : <IconFile />}
            label={folderName}
            onClick={createOnFolderItemClickHandler(folderPathname)}
            onDoubleClick={() => showPromptToRenameFolder(folderPathname)}
            onFoldButtonClick={() => toggleSideNavOpenedItem(itemId)}
            controlComponents={[
              <ControlButton
                key='addFolderButton'
                onClick={() => showPromptToCreateFolder(folderPathname)}
                icon={<IconAddRound />}
              />
            ]}
          />
        )
      })}
    </>
  )
}

function getFolderNameElementTree(folderPathnameList: string[]) {
  return folderPathnameList.reduce((tree, folderPathname) => {
    const nameElements = folderPathname.slice(1).split('/')

    let targetTree = tree
    for (const nameElement of nameElements) {
      if (targetTree[nameElement] == null) {
        targetTree[nameElement] = {}
      }
      targetTree = targetTree[nameElement]
    }

    return tree
  }, {})
}

function getOpenedFolderPathnameList(
  tree: {},
  storageId: string,
  openItemIdSet: Set<string>,
  parentPathname: string
) {
  const names = Object.keys(tree)
  const pathnameList: string[] = []
  for (const name of names) {
    const pathname =
      parentPathname === '/' ? `/${name}` : `${parentPathname}/${name}`
    pathnameList.push(pathname)
    if (openItemIdSet.has(getFolderItemId(storageId, pathname))) {
      pathnameList.push(
        ...getOpenedFolderPathnameList(
          tree[name],
          storageId,
          openItemIdSet,
          pathname
        )
      )
    }
  }
  return pathnameList
}

export default FolderListFragment
