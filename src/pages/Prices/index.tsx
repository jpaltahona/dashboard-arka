import React, {useEffect} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Trash } from 'lucide-react';
import PricesService from '@/services/prices'
import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/Auth'
const formSchema = z.object({
    title: z.string().min(4, {
      message: "title must be at least 4 characters.",
    }),
    desciption: z.string().min(4, {
        message: "Description must be at least 4 characters.",
    }),
    price: z.number(),
})

function Prices() {

    let setup = useMutation({
        mutationFn: PricesService.getAll,
        onSuccess: async (data) => {
            if(data === null){
               const rest = await AuthService.refreshAccessToken();
               if(rest.accessToken){
                   setup.mutate();
               }else{
                AuthService.removeAuthToken();
               }
            }
           return data
        },
        onError: (error) => {
            console.log("error ", error)
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            desciption: "",
            price: 0
        },
    })
    let cratePrice = useMutation({
        mutationFn: PricesService.create,
        onSuccess: async (data) => {
            if(data === null){
               const rest = await AuthService.refreshAccessToken();
               if(rest.accessToken){
                   setup.mutate();
               }else{
                AuthService.removeAuthToken();
               }
            }
            setup.mutate();
            form.reset();
           return data
        },
        onError: (error) => {
            console.log("error ", error)
        }
    });

    let deletePrice = useMutation({
        mutationFn: PricesService.deletePrice,
        onSuccess: async (data) => {
            if(data === null){
               const rest = await AuthService.refreshAccessToken();
               if(rest.accessToken){
                   setup.mutate();
               }else{
                AuthService.removeAuthToken();
               }
            }
            setup.mutate();
            form.reset();
           return data
        },
        onError: (error) => {
            console.log("error ", error)
        }
    });

    

    useEffect( () => {
        setup.mutate();
    }, [] )

    if(setup.isPending) return <div>Loading...</div>

    if (setup.isError) return <div>Error</div>

  return (
    <>
    <div className='flex justify-between items-center'>  
            <div className='mb-5'>
                <h2 className='text-[26px] font-semibold'>List Prices</h2>
                <p className='text-[16px] text-[#424242]'>Create prices for services Supports</p>
            </div>
          
    </div>
    <div className='bg-[#fff] p-5 rounded-lgoverflow-auto flex h-fit '>
        <div className='grid grid-cols-2 gap-4 h-[400px] w-[60%] overflow-y-auto mr-6'>
            { setup.data?.map((i:any) => {
                return <div className='w-[280px] shadow-md rounded-[20px] px-[18px] py-3 bg-[#EAF3DE]'>
                    <div className='flex justify-between items-center'>
                        <div className='px-2 py-2  flex justify-center items-center text-[#19402E] bg-[#CBDEAE] rounded-lg font-bold text-[10px]'>
                            {i.title}
                        </div>
                        <Button className='' variant="ghost" onClick={() => deletePrice.mutate(i._id)}>
                            <Trash className='h-[18px]'/>
                        </Button>
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-[#19402E] text-[15px] font-bold'>${i.price}/Month</h3>
                        <p className='text-[#19402E] mt-2 text-[12px] font-medium'>
                            {i.desciption}
                        </p>
                    </div>
                </div>
            }) }
        </div>
        <div className='w-[40%] rounded-lg bg-[#f3f3f3]  p-6'>
            <Form {...form}>
                <h3 className=' font-semibold mb-3 text-[20px]'>Create New prices</h3>
                <form onSubmit={form.handleSubmit((value) => cratePrice.mutate(value))} className="w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field}   />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Price" {...field} 
                                onChange={(e) =>  field.onChange(parseInt(e.target.value))}
                              type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="desciption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <Button type="submit" className='w-full !mt-[26px] bg-[#19402E]' disabled={cratePrice.isPending} >
                        { cratePrice.isPending ? "Creando" : "Add New Price" } 
                    </Button>
                </form>
            </Form>
        </div>
    </div>
        
    </>
    
  )
}

export default Prices