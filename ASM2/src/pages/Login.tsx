
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ILogin } from '../interfaces/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<ILogin>();
  const navigate = useNavigate()

  const onSubmit = async (dataInput: ILogin) =>{
    // console.log(data);
    try {
      const {data} = await axios.post(` http://localhost:3000/login`,dataInput);
        if(data){
          localStorage.setItem('token', data.accessToken)
        }
        toast.success("Đăng nhập thành công");
        navigate('/')
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }
  return (
    <div>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email",{
              required: "Không để trống email",
              pattern:{
                value: /^\S+@\S+\.\S+$/,
                message:"Sai định dạng email"
              }
            })}
          />
          {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password",{
              required: "Không để trống password",
              minLength:{
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
  )
}

export default Login