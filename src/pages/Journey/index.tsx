import React, { useState, useEffect } from 'react'
import AnswareService from '../../services/Answare'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateAnsware from './CreateAnsware';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Settings, Plus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/Auth';

function Journey() {
  const [open, setOpen] = useState(false);
  const [reaload, setReload] = useState(false);

  let setup = useMutation({
      mutationFn: AnswareService.getAll,
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
  }, [reaload] )

  if(setup.isError) return <div>Error</div>
  if(setup.isPending) return <div className='flex h-[350px] w-full justify-center items-center'>Cargado...</div>

  
  return (
    <div className='p-5 rounded-lg h-full overflow-auto'>
      <div className='flex justify-between items-center mb-4'>  
        <div className='mb-5'>
          <h2 className='text-[28px] text-[#212121] font-semibold'>Create questions</h2>
          <p className='text-[18px] text-[#757575]'>Lis</p>
        </div>
        <div className='flex w-[700px] bg-[#FFFFFF] p-6 rounded-lg'>
          <div >
            <h2 className='text-[#212121] font-semibold text-[18px] mb-2'>Crea una capacitación</h2>
            <p className='text-[#757575] text-[16px]'>Ayuda a crecer a tus compañeros creando capacitaciones .</p>
          </div>
          <div>

          </div>
          <Button variant="outline" onClick={() => setOpen(!open)}>Crear uno nuevo <Plus className=' ml-2'/></Button>
        </div>
       
      </div>


      <div className='grid grid-cols-4 gap-4'>

        {  setup.data && setup.data.map( (i:any) => {
          return <div className='bg-[#FFFFFF] border-2 p-4 rounded-lg relative' key={i._id}>
          
            <div className='mt-3'>
              <h2 className='text-[#212121] font-bold text-[18px] mb-2'>{i.title}</h2>
              <p className='text-[#212121] text-[14px] font-medium'>{i.description}</p>
              <div className='bg-[#3CAE49] p-[2px] rounded-full w-[100px] text-[#fff] text-center mt-3'>{i.type}</div> 
            </div>
           
          </div>
        } ) }
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <CreateAnsware onOpenChange={() => setOpen(!open)} 
                setReload={() => setReload(!reaload)}/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Journey