import React, { useState, useEffect } from 'react'
import AddClient from './AddClient';
import UpdateClient from './UpdateClient';
import { inject, observer } from 'mobx-react'

const Actions = inject("CRMStores", "UpdateStores")(observer((props) => {

  return (
    <div className='actionsContainer'>
      <AddClient />
      <UpdateClient />
      {/* <AddClient name={'first'} type={'text'} placeholder={'First Name'} />
      <AddClient name={'last'} type={'text'} placeholder={'Last Name'} />
      <AddClient name={'email'} type={'text'} placeholder={'Email'} />
      <AddClient name={'date'} type={'date'} placeholder={'Date'} />
      <select className="dropdown">
      <option selected hidden>Select Country</option>
        {countries.map(country => <option name='country' onChange={props.UpdateStores.handleInput} value={props.UpdateStores.country}>{country}</option>)}
      </select>
      <select className="dropdown" >
      <option selected hidden>Select Owner</option>
        {props.CRMStores.owners && props.CRMStores.owners
          .map(owner => <option name='owner' onChange={props.UpdateStores.handleInput} value={props.UpdateStores.owner}>{owner.owner}</option>)}
      </select> */}


      {/* <input type="checkbox" onChange={handleCheckBox} />
            <label>Sold Product</label>

            <UpdateClient selectValue={country_id} name='country_id' data={props.crmStore.countries} placeholder={'Country'} />
            <UpdateClient selectValue={owner_id} name='owner_id' data={props.crmStore.owners} placeholder={'Employee'} />
            <UpdateClient selectValue={email_type_id} name='email_type_id' data={props.crmStore.emailTypes} placeholder={'Email Type'} /> */}
    </div>
  )
}))

export default Actions;