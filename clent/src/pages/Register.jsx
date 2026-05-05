import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/auth/useAuth'



const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { registerUser } = useAuth()


    const password = watch("password")

    const onSubmit = async (data) => {
        console.log("clicked")
        try {
            await registerUser(data)
        } catch (error) {
            console.log(error, "error i submission")
        }
    }
    return (
        <div className='h-screen w-screen overflow-hidden flex items-center justify-center'>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className='text-black text-xl shadow-2xl rounded-xl  max-w-3xl mx-auto p-12 m-12 '>
                <h1 className='text-2xl font-semibold uppercase tracking-wide text-center'>Register</h1>
                <div className='flex flex-col justify-center mx-auto items-center'>


                    <input autoComplete="off"  {...register("name", { required: "Name is required" })}
                        placeholder='Enter the Name' type="text" id="" />
                    {errors.name && <p className='text-xs text-red-500 '>{errors.name.message}</p>}


                    <input autoComplete="off"  {...register("email", { required: "Email is required" })}
                        type="email" placeholder='Eter the Email' id="" />
                    {errors.email && <p className='text-xs text-red-500 '>{errors.email.message}</p>}


                    <input autoComplete="new-password"  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 letter is required" } })}
                        type="password" placeholder='Enter Password' />
                    {errors.password && <p className='text-xs text-red-500 '>{errors.password.message}</p>}


                    <input autoComplete="off"   {...register("confirmPassword", {
                        required: "Confirm your password", validate: (value) => {
                            return value === password || "Password do not match"
                        }
                    })}
                        type="password" placeholder='Confirm Password' />
                    {errors.confirmPassword && <p className='text-xs text-red-500 '>{errors.confirmPassword.message}</p>}


                    <button type='submit' className='bg-black text-white  rounded-xl px-8 my-2 py-2'>Register</button>


                    <p className='text-xs text-black text-center'>Already have an account? Please {" "}
                        <a className='text-blue-600 ' href="">Click here</a>
                        <br />
                        To login
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register