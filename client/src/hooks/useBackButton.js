// // hooks/useBackButton.js
// import { useEffect, useRef } from 'react';
// import { App } from '@capacitor/app';
// import { useNavigate } from 'react-router-dom';

// export const useBackButton = () => {
//   const navigate = useNavigate();
//   const lastTimeBackPress = useRef(0);
  
//   useEffect(() => {
//     const handleBackButton = async () => {
//       // Lấy thời gian hiện tại
//       const currentTime = new Date().getTime();

//       // Nếu khoảng thời gian giữa 2 lần nhấn back < 2000ms (2 giây)
//       if (currentTime - lastTimeBackPress.current < 2000) {
//         App.exitApp();
//         return;
//       }

//       // Cập nhật thời gian nhấn back gần nhất
//       lastTimeBackPress.current = currentTime;

//       // Thông báo cho người dùng
//       navigator.vibrate(100); // Tạo rung nhẹ (nếu thiết bị hỗ trợ)
//       alert('Nhấn back lần nữa để thoát ứng dụng');

//       // Quay lại trang trước đó
//       navigate(-1);
//     };

//     App.addListener('backButton', handleBackButton);

//     return () => {
//       App.removeAllListeners();
//     };
//   }, [navigate]);
// };

// hooks/useBackButton.js
import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog } from '@capacitor/dialog';

export const useBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = async () => {
      // Kiểm tra nếu đang ở trang chủ
      if (location.pathname === '/') {
        const { value } = await Dialog.confirm({
          title: 'Thoát ứng dụng',
          message: 'Bạn có muốn thoát ứng dụng không?',
          okButtonTitle: 'Thoát',
          cancelButtonTitle: 'Hủy'
        });

        if (value) {
          App.exitApp();
        }
      } else {
        // Nếu không ở trang chủ thì quay lại trang trước
        navigate(-1);
      }
    };

    App.addListener('backButton', handleBackButton);

    return () => {
      App.removeAllListeners();
    };
  }, [navigate, location]);
};