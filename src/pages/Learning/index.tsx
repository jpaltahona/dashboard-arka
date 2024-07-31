import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import LearnigService from '@/services/Learning';
import { Eye, Trash2, Settings, Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import CreateCourseForm from './CreateCourseForm';
import AuthService from '@/services/Auth';
import { useMutation } from '@tanstack/react-query';
import InfoCourse from './InfoCourse';


function Learning() {
    const [open, setLOpen] = useState(false);
    const [openDataCourse, setOpenDataCourse] = useState({
        open: false,
        data: null
    });
    let setup = useMutation({
        mutationFn: LearnigService.getAll,
        onSuccess: async (data) => {
            if(data === null){
               const rest = await AuthService.refreshAccessToken();
               console.log(rest)
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


    const deleteCoussr = useMutation({
        mutationFn: LearnigService.deleteCourse,
        onSuccess: async (data) => {
            setup.mutate();
        },
        onError: (error) => {
            alert("")
        }
    });

    const getTask = async (id:string) => {
        await AuthService.refreshAccessToken();
        const res = await LearnigService.getCourse(id);
        setOpenDataCourse({
            open: true,
            data: res
        })
    }
    useEffect( () => {
       setup.mutate();
    }, [] );
    
    if(setup.isError) return <div>Error</div>
    if(setup.isPending) return <div className='flex h-[350px] w-full justify-center items-center'>Cargado...</div>

    console.log(setup.data)
    return (
        <div className='bg-[#fff] p-5 rounded-lg h-full overflow-auto'>
            <div className='flex justify-between items-center'>  
                <div className='mb-5'>
                    <h2 className='text-[26px] font-semibold'>Learning</h2>
                    <p className='text-[16px] text-[#424242]'>List courses</p>
                </div>
                <Button variant="outline" onClick={() => setLOpen(true) }>Crear uno nuevo <Plus className=' ml-2'/></Button>
            </div>
            <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>title</TableHead>
                        <TableHead>type</TableHead>
                        <TableHead>lenguages</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { setup.data &&
                    setup.data?.map( (i:any) => {
                        return <TableRow>
                                <TableCell>{i.title}</TableCell>
                                <TableCell>{i.type}</TableCell>
                                <TableCell>{i.lenguages ? i.lenguages : ""}</TableCell> 
                                <TableHead>{i.teachers.name}</TableHead>
                                <TableCell>{i.status === true ? 'Activo': 'Inactivo' }</TableCell>
                                <TableCell>
                                    <Button variant="ghost" className=' p-1 mx-1 w-7'
                                    onClick={() => getTask(i._id)}
                                    ><Eye /> </Button>
                                    
                                    <Button variant="ghost" className=' p-1 mx-1 text-red-600 w-7'
                                    onClick={() => deleteCoussr.mutate(i._id)}
                                    ><Trash2 /> </Button>
                                </TableCell>
                            </TableRow>
                    } ) 
                    }
                </TableBody>
            </Table>
            </div>
            <Sheet open={open} onOpenChange={() => setLOpen(!open) }>
               
               <SheetContent className='min-w-[800px]'>
                   <SheetHeader>
                   <SheetTitle>Create New Course</SheetTitle>
                   </SheetHeader>
                   <CreateCourseForm 
                   onAction={setLOpen}
                   />
               </SheetContent>
           </Sheet>
           <Sheet open={openDataCourse.open} onOpenChange={() => setOpenDataCourse({ open: false, data: null }) }>
               <SheetContent className='min-w-[60%]'>
                   <InfoCourse data={openDataCourse.data}/>
               </SheetContent>
           </Sheet>
        </div>
    )
}

export default Learning