import React, { FormEvent, useState } from 'react'
import { BaseLayoutPage } from '../BaseLayoutPage'

export const NewRoom: React.FC = () => {
  const [newRoom, setNewRoom] = useState("")

  const handleCreateRoom = (event: FormEvent) =>{
    event.preventDefault()

    console.log(newRoom)
  }

  return (
    <BaseLayoutPage />
  )
}
