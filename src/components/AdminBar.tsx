
import { UsersRound, FolderSync, BrainCog, Cable, ClipboardCheck, HandCoins } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from '../assets/images/arkaLogo.png'
import { Avatar, AvatarFallback, AvatarImage,  } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-content"


function AdminBar() {
    const {user} = useAuth();
    let navigate = useNavigate()

    return (
        <div className='w-full flex flex-col justify-between h-full p-4'>
        
            <ul  className='w-full flex-1 text-center'>
                <img src={logo} className='mb-6 h-[30px]'/>

                <li className='mb-3' onClick={ ()=> navigate('Users')}>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' >
                        <UsersRound className="mr-2 h-4 w-4" /> Users
                    </Button>
                </li>
                <li className='mb-3' onClick={ ()=> navigate('Journey')}>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' >
                        <FolderSync className="mr-2 h-4 w-4" /> Journey
                    </Button>
                </li>
                <li className='mb-3' onClick={ ()=> navigate('Learning')}>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' >
                        <BrainCog  className="mr-2 h-4 w-4" /> Learning Center
                    </Button>
                </li>
                
                <li className='mb-3' onClick={ ()=> navigate('Supports')}>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost' >
                        <Cable className="mr-2 h-4 w-4" /> Supports 
                    </Button>
                </li>
                <li className='mb-3'>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost'>
                        <ClipboardCheck  className="mr-2 h-4 w-4" /> Tasks 
                    </Button>
                </li>
                <li className='mb-3' onClick={ ()=> navigate('Prices')}>
                    <Button  className='w-full text-[#111827] justify-start text-[15px] font-semibold' variant='ghost'
                    
                    >
                        <HandCoins   className="mr-2 h-4 w-4" /> Prices 
                    </Button>
                </li>
                
            </ul>
            <div className='w-full bg-[#0c1a10] flex p-3 rounded-lg'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                    { user?.tokenData &&
                        <div className=' ml-3'>
                            <h4 className='text-[#fff]  text-[14px]'>
                                {user?.tokenData.username}
                            </h4>
                            <h5 className='text-[#fff] font-light text-[12px]'>{user?.tokenData.role}</h5>
                        </div>
                    }              
            </div>
        </div>
    )
}

export default AdminBar