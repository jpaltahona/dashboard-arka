import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react';
import AuthService from '@/services/Auth'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader,DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/auth-content'

const formSchema = z.object({
    email: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "password must be at least 4 characters.",
    }),
})

export default function Login() {
    const { setUser, user } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setErrors] = React.useState(false);
    
    let navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    const mutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: (data:any) => {
            console.log(data);
            if(data === false) return  setErrors(true)
            let decode = jwtDecode(data.accessToken);
            console.log(decode);

           
                setUser({
                    ...data,
                    tokenData: decode
                });
            
             
            return  navigate("/home")
            
        },
        onError: (error) => {
           setErrors(true)
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        setLoading(true)
        const res = await AuthService.login(values);
        setLoading(false)
        if(res.accessToken){
            console.log(res)
            navigate("/home")
        }else{
            setErrors(true)
            console.log("no ingreso")
        }
        
    }

    return (
        <div>
            <div className="grid grid-cols-2 h-screen">
                <div className='flex flex-col justify-center items-center'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((value) => mutation.mutate(value))} className="space-y-2 w-[350px]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field}  className='border-x-0 border-t-0 rounded-none !mt-0' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="User" {...field} className='border-x-0 border-t-0 rounded-none !mt-0' type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className='w-full !mt-[26px] bg-[#19402E]' disabled={loading}>
                                {  loading === true ? 'Ingresando...' : <>
                                Login <MoveRight className='ml-2' />
                                </>
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
                
                <div className='flex flex-col justify-center items-center bg-[#19402E]'>A</div>
            </div>
            <Dialog open={error} onOpenChange={() => setErrors(!error) } >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Ups!</DialogTitle>
                    <DialogDescription>
                    verify your login details
                    </DialogDescription>
                    </DialogHeader>
                
                </DialogContent>
            </Dialog>
        </div>
    )
}
