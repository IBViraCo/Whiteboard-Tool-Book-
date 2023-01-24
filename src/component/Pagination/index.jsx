import React from 'react'
import { Pagination } from './style'
import vector from '../../assets/icons/Vector.svg'
import { PenToolsItem } from '../sidebar/PenIcon/style'

export default () => {
  const [isActive, setIsActive] = React.useState(false)

  return (
    <Pagination onClick={() => setIsActive(!isActive)} isActive={isActive} >
      <img src={vector} />
    </Pagination>
  )
}
