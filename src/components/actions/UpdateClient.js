import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';


const UpdateClient = inject("CRMStores", "UpdateStores")(observer((props) => {

  useEffect(() => {
    props.CRMStores.getOwners()
    props.CRMStores.getEmailTypes()
    console.log(props.CRMStores.emailTypes);
  }, [props.CRMStores])
  let handleInput = props.UpdateStores.handleInput;

  const updateEmailType = () => {
    let update = { tableName: 'email_type', newValue: props.UpdateStores.emailType }
    props.CRMStores.updateEmailType(props.UpdateStores.last, update)
  }

  const updateOwner = () => {
    let update = { tableName: 'owner', newValue: props.UpdateStores.owner }
    props.CRMStores.updateOwner(props.UpdateStores.last, update)
  }

  const updateSold = () => {
    let update = { tableName: 'sold', newValue: 1 }
    props.CRMStores.updateOwner(props.UpdateStores.last, update)
  }

  return (
    <div className='inputsContainer'> <h5>Update The Client:</h5>
      <input name="last" onChange={handleInput} placeholder='name' />
       <div className='y'>
      <select name='owner' onChange={handleInput} className="dropdown" >
        <option selected hidden>Transfer ownership to:</option>
        {props.CRMStores.owners && props.CRMStores.owners
          .map(owner => <option >{owner.owner}</option>)}
      </select>
      <Button onClick={updateOwner} variant="contained">Transfer</Button>
      </div>
      <div className='y'>
        <select  name='emailType' onChange={handleInput} className="dropdown" >
          <option selected hidden> Send email: </option>
          {props.CRMStores.emailTypes && props.CRMStores.emailTypes
            .map(e => <option >{e.email_type}</option>)}
        </select>
        <Button  onClick={updateEmailType} variant="contained">Send</Button>
      </div>
      <div className='y'>
      <Button onClick={updateSold} variant="contained">Declare sold</Button>
      </div>
    </div>
  )
}))

export default UpdateClient;