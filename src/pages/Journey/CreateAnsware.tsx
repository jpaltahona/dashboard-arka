import React, {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { MoveRight , Trash2} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AnswareService from '@/services/Answare'


const formSchema = z.object({
    title: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    description: z.string().min(4, {
        message: "password must be at least 4 characters.",
    }),
    type: z.string().min(1, {
        message: "this is required",
    }),
})

function CreateAnsware(props:any) {
    const [loading, setLoading] = useState(false);
    const [typeOption, seTypeOption] = useState('text');
    const [option, setOption]: any[] = useState([]);
    const [opcionEscribe, setopcionEscribe] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            type: 'text'
        },
    })

    const addOption = () => {
        setOption([
            ...option,
            opcionEscribe
        ])
        setopcionEscribe("")
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await AnswareService.create({
                ...values,
                options: option
            });
            console.log(res)
            props.onOpenChange();
            props.setReload();
        } catch (error) {
            alert("error al crear")
        }
    }

    return (
        <div>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full mt-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#000] font-semibold'>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example" {...field}  className='border-x-0 border-t-0 rounded-none !mt-0' />
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
                                <FormLabel className='text-[#000] font-semibold'>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example" {...field} className='border-x-0 border-t-0 rounded-none !mt-0' />
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
                                <Select onValueChange={(e) => {
                                    field.onChange(e);
                                    seTypeOption(e)
                                }} defaultValue={typeOption} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="select">Select</SelectItem>
                                    </SelectContent>
                                </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    { typeOption === 'select' &&
                    <>
                        { option.map((i:any) =>  <div className='flex items-center'>
                                <Input type="Text" value={i} 
                                className='bg-[#EAF3DE]'
                            /> 

                            <Trash2  className='ml-3' onClick={() => {
                                let filterIten = option.filter( (e:string) => e != i)
                                setOption(filterIten);
                            }}/>
                        </div>
                        ) }
                       
                            <Input type="Text" placeholder="Write an option" 
                                value={opcionEscribe}
                                onChange={(e:any) => setopcionEscribe(e.target.value) }
                            />
                            
                        
                        
                        <Button type="button" onClick={addOption} disabled={opcionEscribe.length >= 1 ? false : true}>Add option</Button>
                    </>
                    }
                    <Button type="submit" className='w-full !mt-[26px] bg-[#19402E]' disabled={loading}>
                        {  loading === true ? 'Guardando...' : <>
                        Agregar <MoveRight className='ml-2' />
                        </>
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateAnsware