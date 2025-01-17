import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UserChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        { password, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Mật khẩu thay đổi thành công");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        toast.error("Mật khẩu hiện tại không đúng, vui lòng nhập lại");
      });
  };

  return (
    <div className="">
      <div className="text-[20px] font-[600] mb-6 pb-2 flex border-gray-300">
        Đổi mật khẩu
      </div>
      <div className="flex justify-center items-center ">
        <form aria-required onSubmit={passwordChangeHandler} className="">
          <div className="flex flex-col items-center">
            <div className="w-[20rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] mb-2 flex justify-start">
                Nhập mật khẩu hiện tại
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu hiện tại"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!bg-white !text-black"
              />
            </div>

            <div className="w-[20rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] mb-2 flex justify-start">
                Nhập mật khẩu mới
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu mới"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="!bg-white !text-black"
              />
            </div>

            <div className="w-[20rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] mb-2 flex justify-start">
                Xác nhận mật khẩu
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Xác nhận mật khẩu"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="!bg-white !text-black"
              />
            </div>

            <Button className="w-[20rem] min-w-sm mt-3 flex !bg-[#27b3e2] !text-white">Cập nhật</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChangePassword;
