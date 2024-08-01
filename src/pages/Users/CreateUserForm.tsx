import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl,FormDescription,FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import AuthService from '@/services/Auth'
import { Textarea } from "@/components/ui/textarea"
import { MoveRight , Trash2} from 'lucide-react';
import { FilePond, registerPlugin } from 'react-filepond';
import { convertirImagenABase64 } from '@/lib/utils';
import PricesService from '@/services/prices'
import { useMutation } from '@tanstack/react-query'
import Select from 'react-select'

const formSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "lastName must be at least 2 characters.",
    }),
    email: z.string().email({
        message: 'Email is required'
    }),
    image: z.string().optional(),
    password: z.string().min(5, {
        message: "password must be at least 6 characters.",
    }),
    about: z.string().optional(),
    phone: z.string().optional(),
    role: z.string().min(2, {
        message: "Rol is required",
    }),
    status: z.boolean({
        message: 'Status is required'
    }),
    prices: z.array(z.string()).optional()
})
  const optionsLista = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'user' },
    { value: 'support', label: 'support' }
]
function CreateUserForm({onOpne, setupdateView}:any) {

    const [loading, setLoading] = React.useState(false)
    const [roleSelect, setRoleSelect] = React.useState("")
    const [option, setOption]: any[] = React.useState([]);
    const [opcionEscribe, setopcionEscribe] = React.useState("");

    const [optionSpecialities, setSpecialities]: any[] = React.useState([]);
    const [opcionSpecialitiesEscribe, setSpecialitiesopcionEscribe] = React.useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: true
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            let obj = {
                ...values,
                certifications: option,
                specialities: optionSpecialities
            }
            await AuthService.refreshAccessToken();
            const rest = await AuthService.create(obj);
            setLoading(false)
            onOpne(false)
            setupdateView(true)
        } catch (error) {
            alert("error al crar usuario")
            setLoading(false)
        }
        
    }
    const addOption = () => {
        setOption([
            ...option,
            opcionEscribe
        ])
        setopcionEscribe("")
    }

    const addOptionSpecialities = () => {
        setSpecialities([
            ...optionSpecialities,
            opcionSpecialitiesEscribe
        ])
        setSpecialitiesopcionEscribe("")
    }

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

    useEffect( () => {
        setup.mutate();
    }, [] );


    return (
        <div className='w-full h-full overflow-y-auto p-[26px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Create new User</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className='mb-4  h-[80px]'>
                                <FormControl>
                                    <FilePond
                                        acceptedFileTypes={['image/png', 'image/jpeg']}
                                    
                                        onupdatefiles={ async (e:any) => {
                                            const base64String = await convertirImagenABase64(e[0].file);
                                            field.onChange(base64String)
                                        }}
                                        allowMultiple={false}
                                        name="files"
                                        className="inputs"
                                        labelIdle={`<div class="h-full flex flex-col justify-center items-center ">
                                        
                                        <span class="filepond--label-action font-bold">Profile image <span class="text-[#5080EF]">click aquí</span> </span>
                                        </div>`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className='mb-6'>
                                <FormControl>
                                    <Select 
                                        isMulti={false}
                                        onChange={(e:any) => {
                                            setRoleSelect(e.value);
                                            field.onChange(e.value);
                                        }}
                                        options={optionsLista}
                                    >
                                        
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className='flex gap-3 mb-4'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="user name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormControl>
                                    <Textarea  placeholder="about" {...field}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    { roleSelect && roleSelect != "user" ?
                    <>
                    <div>
                        <FormField
                            control={form.control}
                            name="prices"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#000] font-semibold'>Precios</FormLabel>
                                    <FormControl>
                                    <Select 
                                        isMulti={true}
                                        options={ setup.data?.map((i:any) => {
                                            return { value: i._id, label: i.title }
                                        }) }
                                        onChange={(e:any) => {
                                            field.onChange(e.map((itemss:any) => itemss.value))
                                        }}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex gap-3 mt-4'>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="email" {...field} type="email" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="phone" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='my-4'>
                                <FormControl>
                                    <Input placeholder="password" {...field}  />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <div className='flex flex-col gap-3 my-6 border-b-[3px] pb-4'>
                    <b>Certifications</b>
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
                    </div>
                    
                    <div className='flex flex-col gap-3 mb-6 border-b-[3px] py-4'>
                        <b>Specialities</b>
                        { optionSpecialities.map((i:any) =>  <div className='flex items-center'>
                                <Input type="Text" value={i} 
                                className='bg-[#EAF3DE]'
                            /> 

                            <Trash2  className='ml-3' onClick={() => {
                                let filterIten = optionSpecialities.filter( (e:string) => e != i)
                                setSpecialities(filterIten);
                            }}/>
                        </div>
                        )}
                        <Input type="Text" placeholder="Write an option" 
                            value={opcionSpecialitiesEscribe}
                            onChange={(e:any) => setSpecialitiesopcionEscribe(e.target.value) }
                        />
                        <Button type="button" onClick={addOptionSpecialities} disabled={opcionSpecialitiesEscribe.length >= 1 ? false : true}>Add option</Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className='flex-col mt-4'>
                                <FormLabel className='w-full'>status*</FormLabel>
                                <FormControl>
                                    <div className='w-full flex gap-3'>
                                        <Switch  onCheckedChange={ (e:any) => field.onChange(e) } checked={field.value} /> 
                                        <span>{ field.value === true ?"Active": "Inactive" }</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </>
                    : null
                    }
                    
                    
                    <div className='flex justify-end gap-4 border-t-2 pt-4 mt-6'>
                        <Button type="button" variant="outline" onClick={() => onOpne(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}> { loading === true ? "Saving..." : "Save" }  </Button>
                    </div>
                </form>
                </Form>
        </div>
    )
}

export default CreateUserForm