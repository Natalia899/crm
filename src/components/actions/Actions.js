import React from 'react'
import AddClient from './AddClient';
import UpdateClient from './UpdateClient';
import { inject, observer } from 'mobx-react'

const Actions = inject("CRMStores", "UpdateStores")(observer((props) => {

  return (
    <div className='actionsContainer'>
      <AddClient />
      <UpdateClient />
    </div>
  )
}))

export default Actions;