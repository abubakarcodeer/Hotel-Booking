import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarImg from '../../assets/images/avatar.png';
import { getSessionUser } from '../../utils/authentication';
import getImageUrl from '../../utils/imageUrl';

function UserBox() {
  const user = getSessionUser();
  const navigate = useNavigate();

  const handleImgError = (e) => {
    e.target.src = AvatarImg;
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='mx-4 my-2 px-4 py-3 flex items-center space-x-4 cursor-pointer hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5'
      onClick={() => navigate('/main/profile')}
    >
      <div className='relative'>
        <img
          className='w-12 h-12 rounded-full border-2 border-color-primary/30 object-cover bg-gray-800'
          src={user?.avatar ? getImageUrl(user.avatar) : AvatarImg}
          crossOrigin='anonymous'
          alt='avatar-img'
          onError={handleImgError}
        />
        <div className='absolute bottom-0 right-0 w-3 h-3 bg-color-success border-2 border-[#1a1612] rounded-full' />
      </div>
      <div className='flex flex-col truncate'>
        <h2 className='text-white text-sm font-semibold truncate font-body-font'>
          {user?.fullName}
        </h2>
        <span className='text-[0.65rem] text-color-primary uppercase tracking-widest font-medium'>
          Administrator
        </span>
      </div>
    </div>
  );
}

export default UserBox;
