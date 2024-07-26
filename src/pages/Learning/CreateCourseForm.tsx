import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Select from 'react-select'
import { Textarea } from "@/components/ui/textarea"
import AuthService from '@/services/Auth'
import UsersService from '@/services/users'
import { useMutation } from '@tanstack/react-query'
import LearnigService from '@/services/Learning'
import { useAuth } from '@/context/auth-content'


const formSchema = z.object({
    title: z.string().min(4, {
      message: "title must be at least 4 characters.",
    }),
    description: z.string().min(4, {
        message: "password must be at least 4 characters.",
    }),
    image:  z.string().optional(),
    type: z.string().min(4, {
        message: "type is required",
    }),
    lenguages: z.array(z.any()).optional() ,
    teachers: z.string()
})

function CreateCourseForm(props:any) {
    let {user}:any = useAuth();
    const [loadingView, setLoadingView] = React.useState(true);
    const [listUser, setListUser]:any = React.useState([]);
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: ""
        },
    })

    const getIntialData = async () => {
        try {
            setLoadingView(true);
            await AuthService.refreshAccessToken();
            const lisUser = await UsersService.findByRole("support")
            setListUser(lisUser);
            setLoadingView(false);
        } catch (error) {
            setLoadingView(false);
            alert("error al cargar la vista")
        }
    }

    const saveCourse = useMutation({
        mutationFn: LearnigService.saveCourse,
        onSuccess: (data:any) => {
            console.log(data)
            if(data.message) return props.onAction(false)
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        let obj = {
            ...values,
            status: true,
            lenguages: values.lenguages?.map((i:any) => i.value),
            createBy: user?.tokenData.sub
        }
        console.log(obj);
        saveCourse.mutate(obj);
    }

    useEffect( () => {
        getIntialData();
    }, [] );
    if(loadingView) return <div className='w-full h-full flex justify-center items-center'>
        <h3>Loading...</h3>
    </div>
    return (
        <div className='w-full h-full overflow-y-auto pb-[30px]'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field}  className='rounded-md !mt-0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Url de imagen</FormLabel>
                                <FormControl>
                                    <Input placeholder="http://image.com" {...field}  className='rounded-md !mt-0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="User" {...field} className='rounded-md !mt-0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#000] font-semibold'>type</FormLabel>
                                <FormControl>
                                <Select 
                                isMulti={false}
                                options={[
                                        { value: 'course', label: 'course' },
                                ]}
                                onChange={(e:any) => field.onChange(e.value) }
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className='grid grid-cols-2 gap-4'>
                    { listUser && 
                        <FormField
                            control={form.control}
                            name="teachers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#000] font-semibold'>teacher</FormLabel>
                                    <FormControl>
                                    <Select
                                       
                                        isMulti={false}
                                        options={
                                            listUser.map( (i:any) => {
                                                return { value: i._id, label: i.name }
                                            })
                                        } 
                                        onChange={(e:any) => {
                                            field.onChange(e.value) 
                                        } }
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                        <FormField
                            control={form.control}
                            name="lenguages"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#000] font-semibold'>Lenguages</FormLabel>
                                    <FormControl>
                                    <Select
                                        isMulti={true}
                                        options={[
                                            { value: 'English', label: 'English' },
                                            { value: 'Spanish', label: 'Spanish' },
                                        ]} 
                                        onChange={(e:any) => field.onChange(e) }
                                    />
                                    </FormControl>
                                
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button type="submit" className='w-full !mt-[26px] bg-[#19402E]' disabled={saveCourse.isPending}>
                        {  saveCourse.isPending === true ? 'Ingresando...' : <>
                        Save 
                        </>
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCourseForm