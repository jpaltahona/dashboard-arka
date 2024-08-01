import React, { useEffect, useState } from 'react'
import SupportsService from '@/services/Supports'
import { format } from 'date-fns';
import Cookies from 'universal-cookie';
import AuthService from '@/services/Auth';
const cookies = new Cookies();
import { Eye, Trash2, Settings, Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'

function Supports() {
    let setup = useMutation({
        mutationFn: SupportsService.getAll,
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

    const upDateItem =(type:string, data:any) => {

    }
    useEffect( () => {
        setup.mutate();
    }, [] )

    if(setup.isError) return <div>Error</div>
    if(setup.isPending) return <div className='flex h-[350px] w-full justify-center items-center'>Loading...</div>

    return (
        <div className='bg-[#fff] p-5 rounded-lg h-full overflow-auto'>
        <div className='flex justify-between items-center'>  
            <div className='mb-5'>
                <h2 className='text-[26px] font-semibold'>You Meetings</h2>
                <p className='text-[16px] text-[#424242]'>Adminstra tus Encuestas</p>
            </div>
          
        </div>
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>user</TableHead>
                        <TableHead>date</TableHead>
                        <TableHead>note</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { setup.data && setup.data.map( (i:any) => {
                        return <TableRow>
                                <TableCell>{i.user.name}</TableCell>
                                <TableCell>{format(i.date, "MM/dd/yyyy")}</TableCell>
                                <TableCell>{i.note}</TableCell>
                                <TableCell>{i.status === 1 ? 'Activo': 'Inactivo' }</TableCell>
                                <TableCell>
                                    <Button variant="ghost" className=' p-1 mx-1 w-7' onClick={() => upDateItem("check", i)}><Check /></Button>
                                    <Button variant="ghost" className=' p-1 mx-1 text-red-600 w-7'
                                    onClick={() => upDateItem("delete", i)}
                                    ><Trash2 /> </Button>
                                </TableCell>
                            </TableRow>
                    } ) }
                    
                </TableBody>
            </Table>
        </div>
    </div>
    )
}

export default Supports