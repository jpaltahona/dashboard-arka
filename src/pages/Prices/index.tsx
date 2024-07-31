import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Trash } from 'lucide-react';
const formSchema = z.object({
    title: z.string().min(4, {
      message: "title must be at least 4 characters.",
    }),
    Description: z.string().min(4, {
        message: "Description must be at least 4 characters.",
    }),
    Price: z.number(),
})

function Prices() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            Description: "",
            Price: 0
        },
    })

  return (
    <div className='bg-[#fff] p-5 rounded-lgoverflow-auto flex h-fit '>
        <div className='grid grid-cols-2 gap-4 h-[400px] w-[55%] overflow-y-auto mr-6'>
            <div className='w-[280px] h-[150px] shadow-md rounded-[20px] p-[16px] bg-[#EAF3DE]'>
                <div className='flex justify-between items-center'>
                    <div className='w-[100px] h-[30px] flex justify-center items-center text-[#19402E] bg-[#CBDEAE] rounded-lg font-bold text-[10px]'>
                        Messaging Pass
                    </div>
                    <Button className='' variant="ghost">
                        <Trash className='h-[18px]'/>
                    </Button>
                </div>
                <div className='mt-3'>
                    <h3 className='text-[#19402E] text-[15px] font-bold'>$79.99/Month</h3>
                    <p className='text-[#19402E] text-[12px] font-medium'>Unlimited 1-to-1 coaching support via text, audio, and video messages</p>
                </div>
            </div>
            
            
        </div>
        <div className='w'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((value) => console.log(value))} className="space-y-2 w-[350px]">
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
                    name="Price"
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
                    name="Description"
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
                    
                    <Button type="submit" className='w-full !mt-[26px] bg-[#19402E]' >
                     Add New Price
                    </Button>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default Prices