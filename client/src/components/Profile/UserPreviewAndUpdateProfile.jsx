import { toast } from "react-toastify";
import { loadUser, updateUserInfo } from "../../redux/actions/user";
import { server } from "../../server";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const maskString = (str, start, end) => {
  str = String(str); // Chuyển đổi thành chuỗi
  if (str.length <= start + end) return str;
  return (
    str.slice(0, start) + "*".repeat(str.length - start - end) + str.slice(-end)
  );
};

const UserPreviewAndUpdateProfile = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(() => user?.name || "");
  const [email, setEmail] = useState(() => user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(() => user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [maskedEmail, setMaskedEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error); // Hiển thị lỗi
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInfo(email, password, phoneNumber, name)).unwrap();
      // Toast sẽ được hiển thị thông qua successMessage trong useEffect
    } catch (error) {
      // Lỗi sẽ được hiển thị thông qua error trong useEffect
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) {
      toast.error("Vui lòng chọn một file hợp lệ");
      return;
    }

    // Kiểm tra kích thước file
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file quá lớn (tối đa 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        try {
          const base64Image = reader.result;
          const response = await axios.put(
            `${server}/user/update-user-avatar`,
            { image: base64Image },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(loadUser());
          toast.success("Ảnh đại diện cập nhật thành công");
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
              "Có lỗi xảy ra khi cập nhật ảnh đại diện"
          );
        }
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (email && email.includes("@")) {
      const [localPart, domain] = email.split("@");
      setMaskedEmail(maskString(localPart, 3, 2) + "@" + domain);
    } else {
      setMaskedEmail(email || "");
    }
  }, [email]);

  return (
    <div className="w-full h-full">
      <div className="text-[20px] font-[600] mb-6 pb-2 flex border-b-[2px] border-gray-300">
        Thông tin tài khoản
      </div>
      <div className="">
        <div className="flex justify-center mx-10 my-2">
          <div>
            <Avatar className="size-[150px] rounded-full object-cover ">
              <AvatarImage
                src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="w-full mt-5 flex items-center justify-center cursor-pointer ">
              <div className="h-[40px] font-[600] min-w-[110px] flex items-center justify-center text-[14px] rounded cursor-pointer border bg-[#f5f5f0] hover:bg-[#e6e6e6] transition-all duration-300">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <Label htmlFor="image">
                  <p className="cursor-pointer">Chọn ảnh</p>
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full flex flex-col">
                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Họ và Tên
                  </Label>
                  <Input
                    type="text"
                    id="text"
                    placeholder="Nhập họ và tên"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="!bg-white !border-[#27b3e2]"
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Email
                  </Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Nhập email"
                    value={maskedEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!bg-white !border-[#27b3e2]"
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label
                    htmlFor="phoneNumber"
                    className="w-[40%] flex justify-start"
                  >
                    Số điện thoại
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="!bg-white !border-[#27b3e2]"
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Mật khẩu
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    required
                    value={password}
                    min={1}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!bg-white !border-[#27b3e2]"
                  />
                </div>

                <Button className="w-full mt-3 flex max-w-sm !bg-[#27b3e2] !text-white">
                  Cập nhật
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreviewAndUpdateProfile;
