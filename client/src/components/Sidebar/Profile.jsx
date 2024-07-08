import React from 'react'
import { useStore } from '../../app/store'

const Profile = () => {
  const { authUser } = useStore()
  return (
    <div>
      <button className="btn" onClick={() => document.getElementById('profileModal').showModal()}>open modal</button>
      <dialog id="profileModal" className="modal">
        <div className="modal-box">
          <img src={authUser.profilePic}/>
          <p>{authUser.fullName}</p>
          <p>starred messages</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Profile
