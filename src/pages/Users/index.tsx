import { useEffect, useState } from 'react'
import { Table,TableBody,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { ArrowDownUp, Plus, Eye, Trash2  } from 'lucide-react'
import UsersService from '@/services/users'
import AuthService from '@/services/Auth'
import CreateUserForm from './CreateUserForm'
import { useMutation } from '@tanstack/react-query'
import { Sheet, SheetContent } from "@/components/ui/sheet"

function Users() {

    const [visible, setVisible] = useState(false);
    const [updateView, setupdateView] = useState(false);

    let setup = useMutation({
        mutationFn: UsersService.getAll,
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

   
    const getOneUser = async (id:string) => {
        const user = await UsersService.findByid(id);
        console.log(id, user)
    }
    const deleteUser = async (id:string) => {
        const user = await UsersService.deleteUserByid(id);
        console.log(id, user)
        setup.mutate();
    }


    useEffect( () => {
        setup.mutate();
    }, [updateView] );

    if(setup.isError) return <div>Error</div>
    if(setup.isPending) return <div className='flex h-[350px] w-full justify-center items-center'>Loading...</div>

    return (
        <div className='bg-[#fff] p-5 rounded-lg h-full overflow-auto'>
            <div className='flex justify-between'>
                <div className='mb-5'>
                    <h2 className='text-[24px] font-semibold'>User's List</h2>
                </div>
                <Button onClick={() => setVisible(true)}>
                    <Plus /> Add New User
                </Button>

            </div>
            {
                /*    
                <div className='my-3'>
                    <Input placeholder='Search user ...' />
                </div>
                */
            }

            <Table>
                <TableHeader className='bg-[#eeeeee] p-0'>
                    <TableRow className='p-0'>
                        <TableHead className='text-[#111827] text-[15px] p-0 h-auto'>
                            <Button className='font-bold w-full  items-center justify-between p-2' variant="ghost">Name <ArrowDownUp className='w-[16px]' /></Button>
                        </TableHead>
                        <TableHead className=' text-[#111827] text-[15px] p-0 h-auto'>
                            <Button className='w-full font-bold items-center justify-between p-2' variant="ghost">Email <ArrowDownUp className='w-[16px]' /></Button>
                        </TableHead>
                        <TableHead className='text-[#111827] text-[15px] p-0 h-auto'>
                            <Button className='font-bold w-full items-center justify-between p-2' variant="ghost">Username <ArrowDownUp className='w-[16px]' /></Button>
                        </TableHead>
                        <TableHead className='text-[#111827] text-[15px] p-0 h-auto'>
                            <Button className='font-bold w-full  items-center justify-between p-2' variant="ghost">Role <ArrowDownUp className='w-[16px]' /></Button>
                        </TableHead>
                        <TableHead className='text-[#111827] text-[15px] p-0 h-auto'>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {  setup.data && setup.data.map((invoice:any) => (
                    <TableRow key={invoice._id} className=' border-0'>
                        <TableCell className='font-medium text-[#555555] text-[14px] p-3'>{invoice.name}</TableCell>
                        <TableCell className='font-medium text-[#555555] text-[14px] p-3'>{invoice.email}</TableCell>
                        <TableCell className='font-medium text-[#555555] text-[14px] p-3'>{invoice.username}</TableCell>
                        <TableCell className='font-medium text-[#555555] text-[14px] p-3'>{invoice.role}</TableCell>
                        <TableCell className='font-medium text-[#555555] text-[14px] p-3 flex gap-3'>
                            <Button variant="ghost" className='p-0' onClick={() => getOneUser(invoice._id)}> <Eye /> </Button>
                            <Button variant="ghost" className='p-0' onClick={() => deleteUser(invoice._id)}> <Trash2 className='text-[#ff2b2b]' /> </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Sheet open={visible} onOpenChange={() => setVisible(false)}>
                <SheetContent className='!min-w-[600px] p-0'>
                    <CreateUserForm onOpne={setVisible} setupdateView={setupdateView} />
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Users