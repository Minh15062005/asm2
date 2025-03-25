import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ILogin } from "../interfaces/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();
  const navigate = useNavigate();

  const onSubmit = async (dataInput: ILogin) => {
    try {
      const { data } = await axios.post("http://localhost:3000/login", dataInput);
      if (data) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user)); // Lưu thông tin user
      }
      toast.success("Đăng nhập thành công");
      navigate("/");
      window.location.reload(); // Load lại trang sau khi đăng nhập thành công
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <div>
      <h1 className="text-black">Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-black">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email", {
              required: "Không để trống email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Sai định dạng email"
              }
            })}
          />
          {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-black">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Không để trống password",
              minLength: {
                value: 6,
                message: "Cần tối thiểu 6 ký tự"
              }
            })}
          />
          {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
