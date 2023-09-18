import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { View } from '../components/view'
import { fetchMembers } from '../features/member/member.slice'
import { Search } from '../features/member/search.member'
import { RenderMembers } from '../features/member/render.member'
import { AddMember } from '../features/member/add.member'
import { EditMember } from '../features/member/edit.member'
import type { DisplayType, MemberType } from '../utils/types'

export const Members = () => {
  const dispatch = useAppDispatch()
  const [display, setDisplay] = useState<DisplayType>('read')
  const [selectedMember, setSelectedMember] = useState({} as MemberType)
  const [searchParams, setSearchParams] = useSearchParams()

  const typeParam = searchParams.get('type')
  const itemParam = searchParams.get('item')

  useEffect(() => {
    dispatch(
      fetchMembers({
        type: typeParam as 'title' | 'isbn' | 'author',
        item: itemParam
      })
    )
    // eslint-disable-next-line
  }, [typeParam, itemParam])

  return (
    <>
      {display === 'read' && (
        <View
          header='Members'
          description='Members in the library registry.'
          SearchComponent={<Search setSearchParams={setSearchParams} />}
          MainComponent={
            <RenderMembers
              setDisplay={setDisplay}
              setSelectedMember={setSelectedMember}
            />
          }
          action={() => setDisplay('create')}
          actionText='Add member'
        />
      )}
      {display === 'create' && (
        <View
          header='New member'
          description='Provide member details.'
          MainComponent={<AddMember setDisplay={setDisplay} />}
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
      {display === 'update' && (
        <View
          header='Member update'
          description='Provide updated details.'
          MainComponent={
            <EditMember
              setDisplay={setDisplay}
              selectedMember={selectedMember}
            />
          }
          action={() => setDisplay('read')}
          actionText='Minimize'
        />
      )}
    </>
  )
}
