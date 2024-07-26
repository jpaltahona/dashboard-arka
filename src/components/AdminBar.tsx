
import { UsersRound, FolderSync, BrainCog, Cable, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../assets/images/ujueta-blanco.svg'
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

function AdminBar() {

    let navigate = useNavigate()

  return (
    <div className='w-full flex flex-col justify-between h-full p-4'>
       
        <ul  className='w-full flex-1'>
            <img src={logo} className='mb-6'/>

            <li className='mb-3'>
                <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' onClick={ ()=> navigate('Users')}>
                    <UsersRound className="mr-2 h-4 w-4" /> Users
                </Button>
            </li>
            <li className='mb-3'>
                <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' onClick={ ()=> navigate('Journey')}>
                    <FolderSync className="mr-2 h-4 w-4" /> Journey
                </Button>
            </li>
            <li className='mb-3'>
                <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' onClick={ ()=> navigate('Learning')}>
                    <BrainCog  className="mr-2 h-4 w-4" /> Learning Center
                </Button>
            </li>
            
            <li className='mb-3'>
                <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' onClick={ ()=> navigate('Supports')}>
                    <Cable className="mr-2 h-4 w-4" /> Supports 
                </Button>
            </li>
            <li className='mb-3'>
                <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost'>
                    <ClipboardCheck  className="mr-2 h-4 w-4" /> Tasks 
                </Button>
            </li>
        </ul>
        <div className='w-full bg-[#2F7B44] flex p-3 rounded-lg'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className=' ml-3'>
                <h4 className='text-[#fff]  text-[14px]'>Andrea Quintero</h4>
                <h5 className='text-[#fff] font-light text-[12px]'>inventarios@ujueta.com </h5>
            </div>
        </div>
    </div>
  )
}

export default AdminBar